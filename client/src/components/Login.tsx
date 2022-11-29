import React, { useEffect } from "react"
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { UserState } from "../state/actions";
import { Func } from "./Dashboard";

export const Login: React.FC = () => {

    const navigate = useNavigate();
    const { loading, data, error }: UserState = useTypedSelector((state) => state.userDetails);
    useEffect(() => {
        console.log(loading, data, error);
        
        if (data.isLoggedIn) {
            navigate("/dashboard");
        }
    }, [])

    const onClick: Func = () =>{
        window.location.href="http://localhost:3030/login";
    }

    return (
        <React.Fragment>
            <div className="container">
                <div className="login-container">
                    <h1 className="title">Login</h1>
                    <div className="container-body">
                        <button className="login-btn" onClick={onClick}>LOGIN WITH SPOTIFY</button>
                        <p>Please login to get access to spotify content.
                        You will automatically be redirected to this page after login.</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}