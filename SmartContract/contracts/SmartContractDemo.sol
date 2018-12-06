pragma solidity ^0.5.0;

contract SmartContractDemo {
    address payable public deployer;

    address payable public client;
    address payable public tasker;

    uint256 public payAmount;

    constructor (address payable _client, address payable _tasker) public {
        deployer = msg.sender;

        client = _client;
        tasker = _tasker;

        payAmount = 0;
    }

    function sendPaytoDeployer() public payable {
        require(client == msg.sender);
        payAmount += msg.value;
    }

    function sendPayAmountToTasker() public payable {
        require(deployer == msg.sender);

        // transfer pay amount to tasker
        tasker.transfer(payAmount);

        // nullify pay amount manually
        payAmount = 0;
    }
}