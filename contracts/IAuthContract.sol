// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAuthContract {
    // Check if a user is a Club Admin for a specific club
    function isClubAdmin(uint256 _clubId, address _user) external view returns (bool);

    // Check if a user is a member of a club
    function isClubMember(uint256 _clubId, address _user) external view returns (bool);

    // Suspend a club (only Super Admin)
    function suspendClub(uint256 _clubId) external;

    // Suspend a user (only Super Admin)
    function suspendUser(address _user) external;
}