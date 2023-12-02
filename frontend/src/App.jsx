import './App.css'

import { connectWallet, handleAccountChanged } from './components/walletServices.js';
import { handleGetAccounts, handleClick, handleAddAccount, handleAddProposal, handleVote } from './components/contractServices.js';

import { useEffect, useState } from 'react';
import ProposalList from './components/componentsJSX/ProposalList.jsx';
import Proposal from './components/componentsJSX/Proposal.jsx';
import Stake from './components/componentsJSX/Stake.jsx';
import Vid from './components/componentsJSX/Vid.jsx';
import ConnectBtn from './components/componentsJSX/ConnectBtn.jsx';
import Balance from './components/componentsJSX/Balance.jsx';

function App() {

  const [currentAccount, setCurrentAccount] = useState(null);

  handleAccountChanged(setCurrentAccount);

  // useEffect(() => {

  // }, [currentAccount]);

  const ownerIsCurrent = () => {
    if (currentAccount === "0xEe3fdFf10e5262d36dc293B5989eB3736E389e69") {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="App">

      <Vid />

      <header className='header'>
        <h1 className='logo'>VOTING SYSTEM</h1>
        <Balance />
        <ConnectBtn setCurrentAccount={setCurrentAccount} currentAccount={currentAccount}/>
      </header>

    
      <Stake currentAccount={currentAccount}/>
      
        {ownerIsCurrent() ?
          <div className='owner-content'>
            <Proposal currentAccount={currentAccount} />
            <ProposalList currentAccount={currentAccount} />
          </div>
          
          :
          <ProposalList currentAccount={currentAccount} />}
      
      {/* <ProposalList currentAccount={currentAccount} /> */}
      
      

    </div>
  )
}

export default App