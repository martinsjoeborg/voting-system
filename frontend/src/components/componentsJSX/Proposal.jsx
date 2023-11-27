import { handleAddProposal } from "../contractServices";
import { useState } from "react";

const Proposal = ({currentAccount}) => {

    const [proposal, setProposal] = useState("");

    return (
        <div className="proposal">
            <form onSubmit={(e) => handleAddProposal(e, currentAccount, proposal)}>
                <p>Write proposal here.</p>
                <textarea name="" id="" cols="30" rows="10" value={proposal} onChange={ (e) => { setProposal(e.target.value) }}></textarea>
                <button>ADD</button>
            </form>
        </div>
        
    );
}
 
export default Proposal;