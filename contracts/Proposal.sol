// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./IClubRegistry.sol";
import "./IAuthContract.sol";
import "./IElectionManager.sol";

contract ProposalManager is AccessControl {
    // Cross-contract references
    IClubRegistry public clubRegistry;
    IAuthContract public authContract;
    IElectionManager public electionManager;

    // Proposal data
    struct Proposal {
        uint256 clubId;
        string title;
        string description;
        uint256 budget;
        string attachmentHash; // IPFS hash for attachments
        address submitter;
        ProposalStatus status;
        uint256 votesFor;
        uint256 votesAgainst;
        mapping(address => bool) hasVoted;
    }

    enum ProposalStatus {
        Pending,
        Approved,
        Rejected,
        InVoting,
        Finalized
    }

    // Mappings
    mapping(uint256 => Proposal) public proposals; // proposalId => Proposal
    uint256 public proposalCounter;

    // Events
    event ProposalSubmitted(uint256 proposalId, uint256 clubId, string title);
    event ProposalReviewed(uint256 proposalId, ProposalStatus status);
    event ProposalVoted(uint256 proposalId, address voter, bool voteFor);
    event ProposalFinalized(uint256 proposalId, ProposalStatus status);

    constructor(address _clubRegistry, address _authContract, address _electionManager) {
        clubRegistry = IClubRegistry(_clubRegistry);
        authContract = IAuthContract(_authContract);
        electionManager = IElectionManager(_electionManager);
    }

    // ================== Proposal Submission ================== //
    /// @notice Members submit activity proposals
    function submitProposal(
        uint256 _clubId,
        string memory _title,
        string memory _description,
        uint256 _budget,
        string memory _attachmentHash
    ) external {
        require(
            authContract.isClubMember(_clubId, msg.sender),
            "Not a member"
        );

        uint256 proposalId = proposalCounter++;
        proposals[proposalId].clubId = _clubId;
        proposals[proposalId].title = _title;
        proposals[proposalId].description = _description;
        proposals[proposalId].budget = _budget;
        proposals[proposalId].attachmentHash = _attachmentHash;
        proposals[proposalId].submitter = msg.sender;
        proposals[proposalId].status = ProposalStatus.Pending;

        emit ProposalSubmitted(proposalId, _clubId, _title);
    }

    // ================== Proposal Review ================== //
    /// @notice Club Admin reviews proposals
    function reviewProposal(uint256 _proposalId, ProposalStatus _status) external {
        Proposal storage proposal = proposals[_proposalId];
        require(
            authContract.isClubAdmin(proposal.clubId, msg.sender),
            "Not Club Admin"
        );
        require(
            proposal.status == ProposalStatus.Pending,
            "Already reviewed"
        );

        proposal.status = _status;
        emit ProposalReviewed(_proposalId, _status);

        // If approved, move to voting
        if (_status == ProposalStatus.Approved) {
            proposal.status = ProposalStatus.InVoting;
        }
    }

    // ================== Proposal Voting ================== //
    /// @notice Members vote on proposals
    function voteOnProposal(uint256 _proposalId, bool _voteFor) external {
        Proposal storage proposal = proposals[_proposalId];
        require(
            proposal.status == ProposalStatus.InVoting,
            "Not in voting"
        );
        require(
            authContract.isClubMember(proposal.clubId, msg.sender),
            "Not a member"
        );
        require(!proposal.hasVoted[msg.sender], "Already voted");

        if (_voteFor) {
            proposal.votesFor++;
        } else {
            proposal.votesAgainst++;
        }
        proposal.hasVoted[msg.sender] = true;

        emit ProposalVoted(_proposalId, msg.sender, _voteFor);

        // Check voting threshold (e.g., 50% majority)
        uint256 totalMembers = clubRegistry.getClubMembers(proposal.clubId).length;
        if (proposal.votesFor > totalMembers / 2) {
            proposal.status = ProposalStatus.Finalized;
            emit ProposalFinalized(_proposalId, ProposalStatus.Finalized);
        }
    }

    // ================== View Functions ================== //
    function getProposalDetails(uint256 _proposalId) public view returns (
        uint256 clubId,
        string memory title,
        string memory description,
        uint256 budget,
        string memory attachmentHash,
        address submitter,
        ProposalStatus status,
        uint256 votesFor,
        uint256 votesAgainst
    ) {
        Proposal storage proposal = proposals[_proposalId];
        return (
            proposal.clubId,
            proposal.title,
            proposal.description,
            proposal.budget,
            proposal.attachmentHash,
            proposal.submitter,
            proposal.status,
            proposal.votesFor,
            proposal.votesAgainst
        );
    }
}