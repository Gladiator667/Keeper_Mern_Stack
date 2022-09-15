import React, { useEffect , useContext} from "react"
import { useNavigate } from "react-router-dom"
import { Usercontext } from "./App";

const LogOut = () => {
    const navigate = useNavigate();
    const {dispatch} = useContext(Usercontext);
    const callBackend = async ()=> {
        try{
            const response = await fetch('/api/logout', {
                method: 'GET', 
                headers: {
                    Accept: "applications/json",
                    "Content-Type": "application/json"
                }, 
                credentials: "include"
            })

            if(response.status === 200){
                dispatch({type: "USER", payload: false})
                navigate("/login");
            } else{
                console.log(response);
            }

        } catch (error){
            console.log(error);
        }
    }

    useEffect(() => {
        callBackend();
    }, []);
    
  return (
    <div>LogOut</div>
  )
}

export default LogOut