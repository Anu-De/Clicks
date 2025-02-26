// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./IClubRegistry.sol"; // Interface for Club Registry

contract AuthContract is AccessControl {
    // Roles
    bytes32 public constant SUPER_ADMIN_ROLE = keccak256("SUPER_ADMIN_ROLE");
    bytes32 public constant CLUB_ADMIN_ROLE = keccak256("CLUB_ADMIN_ROLE");
    bytes32 public constant CLUB_MEMBER_ROLE = keccak256("CLUB_MEMBER_ROLE");

    // Reference to Club Registry contract
    IClubRegistry public clubRegistry;

    // Suspension status
    mapping(uint256 => bool) public suspendedClubs; // clubId => status
    mapping(address => bool) public suspendedUsers; // user => status

    constructor(address _clubRegistryAddress) {
        _grantRole(SUPER_ADMIN_ROLE, msg.sender);
        clubRegistry = IClubRegistry(_clubRegistryAddress);
    }

    // ================== Role Checks ================== //
    /// @notice Check if a user is a Club Admin for a specific club
    function isClubAdmin(uint256 _clubId, address _user) public view returns (bool) {
        address clubAdmin = clubRegistry.getClubAdmin(_clubId);
        return _user == clubAdmin;
    }

    /// @notice Check if a user is a member of a club
    function isClubMember(uint256 _clubId, address _user) public view returns (bool) {
        address[] memory members = clubRegistry.getClubMembers(_clubId);
        for (uint256 i = 0; i < members.length; i++) {
            if (members[i] == _user) return true;
        }
        return false;
    }

    // ================== Suspension ================== //
    /// @notice Super Admin suspends a club
    function suspendClub(uint256 _clubId) external onlyRole(SUPER_ADMIN_ROLE) {
        suspendedClubs[_clubId] = true;
    }

    /// @notice Super Admin suspends a user
    function suspendUser(address _user) external onlyRole(SUPER_ADMIN_ROLE) {
        suspendedUsers[_user] = true;
    }
}