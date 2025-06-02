// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Counter {
    uint256 public number;
    mapping(address => uint256) public userCounts;
    
    event NumberSet(address indexed user, uint256 newNumber);
    event Incremented(address indexed user, uint256 newNumber);
    
    function setNumber(uint256 newNumber) public {
        number = newNumber;
        userCounts[msg.sender] = newNumber;
        emit NumberSet(msg.sender, newNumber);
    }

    function increment() public {
        number++;
        userCounts[msg.sender]++;
        emit Incremented(msg.sender, number);
    }
    
    function getUserCount(address user) public view returns (uint256) {
        return userCounts[user];
    }
}