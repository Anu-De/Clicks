// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IClubRegistry {
    function getClubAdmin(uint256 _clubId) external view returns (address);
    function getClubMembers(uint256 _clubId) external view returns (address[] memory);
}