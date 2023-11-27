import { useEffect, useState } from "react";
import { handleGetProposals, handleVote, handleGetAccounts } from "../contractServices";
// import { contract } from "../contractServices";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../contractInfo';
import Web3 from "web3";


import './proposalList.css'

const ProposalList = ({ currentAccount }) => {

    const [proposalArray, setProposalArray] = useState([]);
    const [contract, setContract] = useState(null);
    const [hasStaked, setHasStaked] = useState(false);

    const proposalWeb3 = new Web3(new Web3.providers.HttpProvider('https://eth-sepolia.g.alchemy.com/v2/nXbUUw1MefsUWN3XchahE92O6Z794ZOv'));
    // const proposalContract = new proposalWeb3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

    const getAccounts = async () => {
        const accounts = await handleGetAccounts();
        setHasStaked(accounts.some(account => account.account === currentAccount && account.hasStaked));
    }

    useEffect(() => {
        handleTest();
        getAccounts();
    }, [contract, currentAccount]);

    const handleTest = async () => {
        const proposalContract = new proposalWeb3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        const array = [];
        const testArray = await proposalContract.methods.getProposals().call();
        array.push(testArray);
        setProposalArray(array[0]);
        setContract(proposalContract);
    }

    const htmlList = proposalArray.map((prop) => {
        return (<ul key={prop.proposalID}>
            <li>Proposal: {prop.proposalText}</li>
            <li>Votes: <p className="voteCount">{parseInt(prop.votes)}</p></li>
            <button onClick={(e) => handleVote(e, currentAccount, prop.proposalID)}>VOTE</button>
        </ul>);
    })

    const handleTest2 = () => {
        console.log(proposalArray);
    }

    return (
        <>  {hasStaked || currentAccount === "0xEe3fdFf10e5262d36dc293B5989eB3736E389e69" ? <div className="proposalList">{htmlList}</div> : <></>}
        </>
    );
}

export default ProposalList;