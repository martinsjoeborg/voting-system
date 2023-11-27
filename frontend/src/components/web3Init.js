import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../contractInfo';

export const initWeb3 = () => {
  return new Web3(new Web3.providers.HttpProvider('https://eth-sepolia.g.alchemy.com/v2/nXbUUw1MefsUWN3XchahE92O6Z794ZOv'));
};

export const initContract = (web3) => {
  return new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
};
