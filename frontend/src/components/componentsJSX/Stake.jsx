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
        hasStaked ? 
        <div className="welcome-msg">Vote Below</div> : 
        <div className="stake">
            <form onSubmit={(e) => handleAddAccount(e, currentAccount, stakeValue)} className="stake-content">
                <p>Must stake 0.01 ETH to join.</p>
                <input className="stake-form" type="text" value={stakeValue} placeholder='ETH value' onChange={(e) => setStakeValue(e.target.value)} />
                <button>JOIN</button>
            </form>
            {/* <button onClick={() => console.log('test')}>test</button> */}
        </div>
    );
}

export default Stake;
