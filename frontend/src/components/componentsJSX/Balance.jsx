import "./Balance.css"
import { handleGetBalance } from "../contractServices";
import { useEffect, useState } from "react";

const Balance = () => {

    const [balance, setBalance] = useState(null);

    // useEffect(() => {
    //     const balance1 = handleGetBalance();
    //     setBalance(balance1);
    // })

    const test = async () => {
        const balance1 = await handleGetBalance();
        setBalance(balance1);
    }

    useEffect(() => {
        test();
    })


    return (
        <>
            <div className="balance">Balance: {balance}</div>
            {/* <button onClick={test}>test</button> */}
        </>
        
    );
}
 
export default Balance;