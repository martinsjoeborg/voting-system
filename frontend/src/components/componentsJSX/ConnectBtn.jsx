import { connectWallet } from "../walletServices";
import "../../App.css";
import { useEffect } from "react";

const ConnectBtn = ({ setCurrentAccount, currentAccount }) => {
    
    const checkAccount = () => {
        if (currentAccount !== null) {
            return true
        } else {
            return false
        }
    }

    return (
        <div>
            {checkAccount() ?
                <div className="accText">
                    <div className="accText-content">
                    {currentAccount ? currentAccount.slice(0, 4) + '...' + currentAccount.slice(-4) : 'Waiting...'}
                    </div>
                    
                </div> :

                <button onClick={() => connectWallet(setCurrentAccount)} className='connect-btn'>Connect wallet</button>}
            {/* <button onClick={() => connectWallet(setCurrentAccount)} className='connect-btn'>Connect wallet</button> */}
            
        </div>
    );
}
 
export default ConnectBtn;