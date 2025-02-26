// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IElectionManager {
    // Create a new election
    function createElection(
        uint256 _clubId,
        string memory _title,
        string memory _description,
        uint256 _startTime,
        uint256 _duration
    ) external;

    // Vote in an election
    function vote(uint256 _electionId, bytes32 _encryptedVote) external;

    // Finalize election results
    function finalizeResults(uint256 _electionId, string memory _resultsHash) external;

    // Get nominees for an election
    function getNominees(uint256 _electionId) external view returns (string[] memory);

    // Get encrypted votes for an election
    function getEncryptedVotes(uint256 _electionId) external view returns (bytes32[] memory);
}