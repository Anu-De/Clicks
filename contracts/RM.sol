// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@thirdweb-dev/contracts/lib/Strings.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";


contract ClubRegistry is AccessControl {
    using Strings for uint256;

    // Roles
    bytes32 public constant SUPER_ADMIN_ROLE = keccak256("SUPER_ADMIN_ROLE");
    bytes32 public constant CLUB_ADMIN_ROLE = keccak256("CLUB_ADMIN_ROLE");
    bytes32 public constant CLUB_MEMBER_ROLE = keccak256("CLUB_MEMBER_ROLE");

    // Club Data
    struct Club {
        string name;
        string description;
        string logoURI; // IPFS link
        address admin;
    }

    // Mappings
    mapping(uint256 => Club) public clubs; // clubId => Club
    mapping(uint256 => address[]) public clubMembers; // clubId => members
    mapping(uint256 => address[]) public pendingRequests; // clubId => pending members
    uint256 public clubCounter;

    // Events
    event ClubCreated(uint256 clubId, string name, address admin);
    event MemberInvited(uint256 clubId, address member);
    event MemberApproved(uint256 clubId, address member);
    event MemberRemoved(uint256 clubId, address member);

    constructor() {
        _grantRole(SUPER_ADMIN_ROLE, msg.sender); // Deployer = Super Admin
    }

    // ================== Club Creation ================== //
    /// @notice Super Admin creates a new club.
    function createClub(
        string memory _name,
        string memory _description,
        string memory _logoURI,
        address _clubAdmin
    ) external onlyRole(SUPER_ADMIN_ROLE) {
        uint256 clubId = clubCounter++;
        clubs[clubId] = Club(_name, _description, _logoURI, _clubAdmin);
        _grantRole(CLUB_ADMIN_ROLE, _clubAdmin); // Assign Club Admin role

        emit ClubCreated(clubId, _name, _clubAdmin);
    }

    // ================== Member Management ================== //
    /// @notice Club Admin invites a member (adds to pending requests).
    function inviteMember(uint256 _clubId, address _member) external {
        require(
            hasRole(CLUB_ADMIN_ROLE, msg.sender) || 
            hasRole(SUPER_ADMIN_ROLE, msg.sender),
            "Not authorized"
        );
        pendingRequests[_clubId].push(_member);
        emit MemberInvited(_clubId, _member);
    }

    /// @notice Club Admin approves a pending member.
    function approveMember(uint256 _clubId, address _member) external {
        require(
            hasRole(CLUB_ADMIN_ROLE, msg.sender) || 
            hasRole(SUPER_ADMIN_ROLE, msg.sender),
            "Not authorized"
        );
        clubMembers[_clubId].push(_member);
        _grantRole(CLUB_MEMBER_ROLE, _member);
        _removePendingRequest(_clubId, _member);
        emit MemberApproved(_clubId, _member);
    }

    /// @notice Club Admin removes a member.
    function removeMember(uint256 _clubId, address _member) external {
        require(
            hasRole(CLUB_ADMIN_ROLE, msg.sender) || 
            hasRole(SUPER_ADMIN_ROLE, msg.sender),
            "Not authorized"
        );
        _revokeRole(CLUB_MEMBER_ROLE, _member);
        // Remove from clubMembers array (simplified example)
        emit MemberRemoved(_clubId, _member);
    }

    // ================== Helper Functions ================== //
    function _removePendingRequest(uint256 _clubId, address _member) private {
        address[] storage requests = pendingRequests[_clubId];
        for (uint256 i = 0; i < requests.length; i++) {
            if (requests[i] == _member) {
                requests[i] = requests[requests.length - 1];
                requests.pop();
                break;
            }
        }
    }

    // ================== View Functions ================== //
    function getClubDetails(uint256 _clubId) public view returns (Club memory) {
        return clubs[_clubId];
    }

    function getPendingRequests(uint256 _clubId) public view returns (address[] memory) {
        return pendingRequests[_clubId];
    }

    function getClubMembers(uint256 _clubId) public view returns (address[] memory) {
        return clubMembers[_clubId];
    }
}