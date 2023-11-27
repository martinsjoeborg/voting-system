// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract VotingSystem {
    address public owner;
    //STRUCTS
    struct Account {
        address account;
        bool hasStaked;
        bool hasVoted;
    }
    struct Proposal {
        string proposalText;
        uint256 votes;
        uint256 proposalID;
    }
    //MAPPINGS
    mapping(address => Account) private accounts;
    mapping(address => Proposal) private proposals;
    //ARRAYS
    Proposal[] private proposalArray;
    Account[] private accountsArray;
    //CONSTRUCTOR
    constructor() {
        owner = msg.sender;
    }
    modifier stakedAndVoted(address _accountAddress) {
        require(accounts[_accountAddress].hasStaked, "Account has not staked and can't utilize this function");
        require(!accounts[_accountAddress].hasVoted, "Has already voted once.");
        _;
    }
    modifier onlyOwner(address _accountAddress) {
        require(_accountAddress == owner, "Only owner is authorized.");
        _;
    }
    modifier cantBeOwner(address _accountAddress) {
        require(_accountAddress != owner, "Owner is not authorized to use this function.");
        _;
    }
    //EVENTS
    event AccountAdded(address sender);
    event ProposalAdded(string proposal);
    event HasVoted(address voter, uint256 votedOn);
    //FUNCTIONS
    function addAccount() public payable cantBeOwner(msg.sender) {
        require(msg.value == 10000000000000000, "Must stake 0.01 ETH to join.");
        require(!accounts[msg.sender].hasStaked, "Account already exists.");
        // accounts[msg.sender] = Account({account: msg.sender, hasStaked: true, hasVoted: false});
        Account memory newAccount = Account({account: msg.sender, hasStaked: true, hasVoted: false});
        accounts[msg.sender] = newAccount;
        accountsArray.push(newAccount);
        emit AccountAdded(msg.sender);
    }
    function addProposal(string memory _text) public onlyOwner(msg.sender) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp))) % 9000 + 1000;
        Proposal memory newProposal = Proposal({proposalText: _text, votes: 0, proposalID: randomNumber});
        proposals[msg.sender] = newProposal;
        proposalArray.push(newProposal);
        emit ProposalAdded(_text);
    }
    function getProposals() public view returns (Proposal[] memory) {
        Proposal[] memory allProposals = new Proposal[](proposalArray.length);
        for (uint256 i = 0; i < proposalArray.length; i++) {
            allProposals[i] = proposalArray[i];
        }
        return allProposals;
    }
    function getAccounts() public view returns (Account[] memory) {
        Account[] memory allAccounts = new Account[](accountsArray.length);
        for (uint256 i = 0; i < accountsArray.length; i++) {
            allAccounts[i] = accountsArray[i];
        }
        return allAccounts;
    }
    function vote(uint256 _idNumber) public stakedAndVoted(msg.sender) cantBeOwner(msg.sender) {
        for(uint256 i; i < proposalArray.length; i++) {
            if(proposalArray[i].proposalID == _idNumber){
                proposalArray[i].votes += 1;
            }
        }   
        accounts[msg.sender] = Account({account: msg.sender, hasStaked: true, hasVoted: true});
        emit HasVoted(msg.sender, _idNumber);
    }
    function withdraw() public onlyOwner(msg.sender) {
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    }
}