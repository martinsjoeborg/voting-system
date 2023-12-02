import { handleAddProposal } from "../contractServices";
import { useState } from "react";
import "./Proposal.css"
import { withdraw } from "../contractServices";

const Proposal = ({currentAccount}) => {

    const [proposal, setProposal] = useState("");

    // const handleWithdraw = (e, currentAccount) => {
    //     e
    // }

    return (
        
            <form className="proposalForm" onSubmit={(e) => handleAddProposal(e, currentAccount, proposal)}>
                <p>Proposal</p>
                <textarea className="textArea" name="" id="" cols="30" rows="10" value={proposal} onChange={ (e) => { setProposal(e.target.value) }}></textarea>
                <button>ADD</button>
                <button className="withdraw" onClick={(e) => withdraw(e, currentAccount)}>Withdraw</button>
            </form>
        
        
    );
}
 
export default Proposal;