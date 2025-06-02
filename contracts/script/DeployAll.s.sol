// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Counter} from "../src/Counter.sol";
import {SimpleToken} from "../src/SimpleToken.sol";

contract DeployAll is Script {
    Counter public counter;
    SimpleToken public token;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy Counter
        counter = new Counter();
        console.log("Counter deployed at:", address(counter));

        // Deploy SimpleToken
        token = new SimpleToken("Test Token", "TEST", 1000000);
        console.log("SimpleToken deployed at:", address(token));

        vm.stopBroadcast();
    }
}