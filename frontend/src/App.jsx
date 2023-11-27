import './App.css'

import { connectWallet, handleAccountChanged } from './components/walletServices.js';
import { handleGetAccounts, handleClick, handleAddAccount, handleAddProposal, handleVote } from './components/contractServices.js';

import { useEffect, useState } from 'react';
import ProposalList from './components/componentsJSX/proposalList.jsx';
import Proposal from './components/componentsJSX/Proposal.jsx';
import Stake from './components/componentsJSX/Stake.jsx';
import Vid from './components/componentsJSX/Vid.jsx';
import ConnectBtn from './components/componentsJSX/ConnectBtn.jsx';

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
        <ConnectBtn setCurrentAccount={setCurrentAccount} currentAccount={currentAccount}/>
      </header>

      <section className='section'>
        <div className="section-content">
          <Stake currentAccount={currentAccount}/>
          <div>
            {ownerIsCurrent() ? <Proposal currentAccount={currentAccount}/> : <></>}
          </div>
          <ProposalList currentAccount={currentAccount} />
        </div>
      </section>

    </div>
  )
}

export default App