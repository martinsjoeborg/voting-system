import videoBak from "../../assets/vids/back-vid2.mp4";
import "./Vid.css";

const Vid = () => {
    return (
        <>
           
                <video autoPlay loop muted >
                    <source src={videoBak} type='video/mp4'/>
                </video>
                {/* <div className="overlay"></div> */}
                <div className="gradient"></div>
            
            
        </>
    );
}
 
export default Vid;