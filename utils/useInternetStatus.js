import { useEffect, useState } from "react";

const useInternetStatus = () => {
    //try to check if internet active

    const [InternetStatus,setInternetStaus] = useState(true);

    useEffect(()=> {
        window.addEventListener("offline", ()=>{
            setInternetStaus(false);
        })

        window.addEventListener("online", ()=>{
            setInternetStaus(true);
        })

    },[]);

    //boolean Value
    return InternetStatus;
}  

export default useInternetStatus;