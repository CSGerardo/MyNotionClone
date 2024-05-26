
import { ReactElement } from "react";
import { UseAuthSession } from "./AuthSessionContext";
import { Navigate } from "react-router-dom";
import styles from "../Utils/utils.module.css";

type PrivateProps={
    component: ReactElement
};

export const Private=({ component }: PrivateProps)=>{
    const { session, loading }=UseAuthSession();

    if(loading){
        return (
            <div className={styles.centeredFlex} style={{ width: "100vw"}}>
                <div>
                    <> Authenticating...</>
                </div>
            </div>
        );
    }

    return session ? component  : <Navigate to="/auth"/>;
};