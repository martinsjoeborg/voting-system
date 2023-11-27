import { initWeb3, initContract } from "./web3init";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../contractInfo';

const web3 = initWeb3();
export const contract = initContract(web3);
const web3ForTransactions = new Web3(window.ethereum);
const contractForTransactions = new web3ForTransactions.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

export const handleGetProposals = () => {
    // Your existing logic
    contract.methods.getProposals().call()
        .then(result => {
        console.log(result);
        })
        .catch(error => {
        console.error(error);
        });
};

export const handleGetAccounts = () => {
  // Return the Promise created by `call`
  return contract.methods.getAccounts().call()
    .then(result => {
      // console.log(result);
      return result; // This result will be resolved by the Promise
    })
    .catch(error => {
      console.error(error);
      throw error; // Re-throw the error to be caught by the caller
    });
};


export const handleClick = () => {
    contract.methods.owner().call()
        .then(result => {
        console.log(result);
        })
        .catch(error => {
        console.error(error);
        });
}

export const handleAddAccount = (e, currentAccount, stakeValue) => {
    // Your existing logic
    e.preventDefault();

    const amountInWei = web3.utils.toWei(stakeValue, 'ether');

    contractForTransactions.methods.addAccount().send({

      from: currentAccount,
      value: amountInWei
    })
      .on('transactionHash', hash => {
        console.log('Transaction Hash:', hash);
      })
      .on('receipt', receipt => {
        console.log('Transaction Receipt:', receipt);
      })
      .on('error', error => {
        console.error(error);
      });
};

export const handleAddProposal = (e, currentAccount, proposal) => {
    // Your existing logic
    e.preventDefault();

    contractForTransactions.methods.addProposal(proposal).send({from: currentAccount})
      .on('transactionHash', hash => {
        console.log('Transaction Hash:', hash);
      })
      .on('receipt', receipt => {
        console.log('Transaction Receipt:', receipt);
      })
      .on('error', error => {
        console.error(error);
      });
};

export const handleVote = (e, currentAccount, proposalId) => {
    // Your existing logic
    e.preventDefault();

    const intProposalId = parseInt(proposalId);

    contractForTransactions.methods.vote(intProposalId).send({from: currentAccount})
      .on('transactionHash', hash => {
        console.log('Transaction Hash:', hash);
      })
      .on('receipt', receipt => {
        console.log('Transaction Receipt:', receipt);
      })
      .on('error', error => {
        console.error(error);
      });
};
