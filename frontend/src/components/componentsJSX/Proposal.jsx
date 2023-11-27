import { handleAddProposal } from "../contractServices";
import { useState } from "react";
import "./Proposal.css"

const Proposal = ({currentAccount}) => {

    const [proposal, setProposal] = useState("");

    return (
        <div className="proposal">
            <form className="proposalForm" onSubmit={(e) => handleAddProposal(e, currentAccount, proposal)}>
                <p>Proposal</p>
                <textarea className="textArea" name="" id="" cols="30" rows="10" value={proposal} onChange={ (e) => { setProposal(e.target.value) }}></textarea>
                <button>ADD</button>
                <button className="withdraw">Withdraw</button>
            </form>
        </div>
        
    );
}
 
export default Proposal;