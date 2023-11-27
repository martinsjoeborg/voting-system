import { handleAddAccount, handleGetAccounts } from "../contractServices";
import { useEffect, useRef, useState } from "react";
import "./Stake.css"

const Stake = ({ currentAccount }) => {
    const [stakeValue, setStakeValue] = useState("");
    const [hasStaked, setHasStaked] = useState(false);

    const getAccounts = async () => {
        const accounts = await handleGetAccounts();
        setHasStaked(accounts.some(account => account.account === currentAccount && account.hasStaked));
    }

    useEffect(() => {
        getAccounts();
    }, [currentAccount]);

    return (
        hasStaked || currentAccount === "0xEe3fdFf10e5262d36dc293B5989eB3736E389e69" ? 
        <div className="welcome-msg"></div> : 
        
            <form onSubmit={(e) => handleAddAccount(e, currentAccount, stakeValue)} className="stake-content-component">
                <p>Must stake 0.01 ETH to join.</p>
                <input className="stake-form" type="text" value={stakeValue} placeholder='ETH value' onChange={(e) => setStakeValue(e.target.value)} />
                <button>JOIN</button>
            </form>
        
    );
}

export default Stake;
