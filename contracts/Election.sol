// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
//import "@thirdweb-dev/contracts/extension/EncryptedData.sol"; // For private voting
import "./IClubRegistry.sol";
import "./IAuthContract.sol";

contract ElectionManager is AccessControl {
    // Cross-contract references
    IClubRegistry public clubRegistry;
    IAuthContract public authContract;

    // Election data
    struct Election {
        uint256 clubId;
        string title;
        string description;
        uint256 startTime;
        uint256 endTime;
        string[] nominees;
        bytes32[] encryptedVotes; // Encrypted votes (voter privacy)
        mapping(address => bool) hasVoted;
        bool isFinalized;
    }

    // Mappings
    mapping(uint256 => Election) public elections; // electionId => Election
    mapping(uint256 => mapping(address => bool)) public pendingNominations; // electionId => nominee => status
    uint256 public electionCounter;

    // Events
    event ElectionCreated(uint256 electionId, uint256 clubId, string title);
    event NomineeAdded(uint256 electionId, address nominee);
    event VoteCast(uint256 electionId, address voter);
    event ElectionFinalized(uint256 electionId, string resultsHash); // Store results off-chain (e.g., IPFS)

    constructor(address _clubRegistry, address _authContract) {
        clubRegistry = IClubRegistry(_clubRegistry);
        authContract = IAuthContract(_authContract);
    }

    // ================== Election Setup ================== //
    /// @notice Club Admin creates an election
    function createElection(
        uint256 _clubId,
        string memory _title,
        string memory _description,
        uint256 _startTime,
        uint256 _duration
    ) external {
        require(
            authContract.isClubAdmin(_clubId, msg.sender),
            "Not Club Admin"
        );
        require(_duration > 0, "Invalid duration");

        uint256 electionId = electionCounter++;
        elections[electionId].clubId = _clubId;
        elections[electionId].title = _title;
        elections[electionId].description = _description;
        elections[electionId].startTime = _startTime;
        elections[electionId].endTime = _startTime + _duration;

        emit ElectionCreated(electionId, _clubId, _title);
    }

    // ================== Nominee Management ================== //
    /// @notice Members self-nominate or are nominated by admins
    function nominate(uint256 _electionId, address _nominee) external {
        Election storage election = elections[_electionId];
        require(
            authContract.isClubAdmin(election.clubId, msg.sender) || 
            authContract.isClubMember(election.clubId, msg.sender),
            "Not authorized"
        );
        pendingNominations[_electionId][_nominee] = true;
    }

    /// @notice Club Admin approves/rejects nominees
    function approveNominee(uint256 _electionId, address _nominee, bool _approve) external {
        Election storage election = elections[_electionId];
        require(
            authContract.isClubAdmin(election.clubId, msg.sender),
            "Not Club Admin"
        );
        if (_approve) {
            election.nominees.push(addressToString(_nominee)); // Store nominee ID (e.g., wallet)
        }
        delete pendingNominations[_electionId][_nominee];
        emit NomineeAdded(_electionId, _nominee);
    }

    // ================== Voting ================== //

    /// @notice Convert address to string
    function addressToString(address _addr) internal pure returns (string memory) {
        bytes32 value = bytes32(uint256(uint160(_addr)));
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(42);
        str[0] = '0';
        str[1] = 'x';
        for (uint256 i = 0; i < 20; i++) {
            str[2 + i * 2] = alphabet[uint8(value[i + 12] >> 4)];
            str[3 + i * 2] = alphabet[uint8(value[i + 12] & 0x0f)];
        }
        return string(str);
    }
    /// @notice Private voting (encrypted choice)
    function vote(uint256 _electionId, bytes32 _encryptedVote) external {
        Election storage election = elections[_electionId];
        require(
            block.timestamp >= election.startTime &&
            block.timestamp <= election.endTime,
            "Voting closed"
        );
        require(
            authContract.isClubMember(election.clubId, msg.sender),
            "Not a member"
        );
        require(!election.hasVoted[msg.sender], "Already voted");

        election.encryptedVotes.push(_encryptedVote);
        election.hasVoted[msg.sender] = true;

        emit VoteCast(_electionId, msg.sender);
    }

    // ================== Result Management ================== //
    /// @notice Finalize results (automatic or manual)
    function finalizeResults(uint256 _electionId, string memory _resultsHash) external {
        Election storage election = elections[_electionId];
        require(
            authContract.isClubAdmin(election.clubId, msg.sender) ||
            (block.timestamp > election.endTime && !election.isFinalized),
            "Not authorized"
        );
        election.isFinalized = true;
        emit ElectionFinalized(_electionId, _resultsHash);
    }

    // ================== View Functions ================== //
    function getNominees(uint256 _electionId) public view returns (string[] memory) {
        return elections[_electionId].nominees;
    }

    function getEncryptedVotes(uint256 _electionId) public view returns (bytes32[] memory) {
        return elections[_electionId].encryptedVotes;
    }
}