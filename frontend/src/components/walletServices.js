import Web3 from 'web3';
import { handleGetAccounts } from './contractServices';

async function requestAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];
  }

export const connectWallet = async (setCurrentAccount) => {
  requestAccount();
  if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      setCurrentAccount(accounts[0]);
  };
  // const array = await handleGetAccounts();
  // console.log(array);

};

export const handleAccountChanged = (setCurrentAccount) => {
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
      const checksumAddress = Web3.utils.toChecksumAddress(accounts[0]);
      setCurrentAccount(checksumAddress);
    });
  }
};
