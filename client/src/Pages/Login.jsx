
import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/Logo.jpg";
// npm install react-toastify for error handling module
import { loginRoute } from "../Utils/APIRoutes";

export const Login = () => {

    const [values, setValues ] = useState({
        username : "",
        password : "",
    });
    const ErrorStyled = {
        position : "top-right",
        autoClose : 8000,    
        pauseOnHover : true,
        draggable : true,
        theme : "dark"
    }

    console.log(values);
    console.log(values);
    console.log(values);
    console.log(values);


    const navigate = useNavigate();


    useEffect(() => {
        if(localStorage.getItem("Chater-app-userLogin")) {
            navigate("/");
        }
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()) {
            alert("Hello");
            const { username, password } = values;
            const { data } = await axios.post(loginRoute,{
                username,
                password,
            });
            console.log('data:', data)

            if(data.status === false) {
                toast.error(data.message, ErrorStyled);
            }

            if(data.status === true) {
                localStorage.setItem("Chater-app-userLogin", JSON.stringify(data.user));
                navigate("/setAvatar")
            }
        };
        alert("");
    }

    const handleValidation = () => {
        alert("");
        const { username, password } = values;
        if(password < 8) {
            toast.error("Password Should be greater or equal to 8 character", ErrorStyled);
            return false;
        }
        else if(username === "" || password === "") {
            toast.error("Username and Password Must be required", ErrorStyled);
            return false;
        }
        return true;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name] : value
        }) 
    }
    console.log('values:', values)
    
    return (
        <>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1>Chatter</h1>
                    </div>
                    <input onChange={handleChange} type="text" name="username" placeholder="Username....." />
                    <input onChange={handleChange} type="password" name="password" placeholder="Password....." />
                    <button type="submit">Login</button>
                    <span>Don't have an account <Link to="/register">SignUp</Link> </span>
                </form>
                <ToastContainer></ToastContainer>
            </FormContainer>
        </>
    )

}

const FormContainer = styled.div`
    /* border: 1px solid; */
    height: 100vh;
    width: 100vw;
    display: flex;
    
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #050527;
    .brand {
        /* border: 1px solid white; */
        display: flex;
        align-items: center;
        gap: .01rem;
        
        justify-content: center;
        img {
            height: 3.5rem;
        }
        h1 {
            margin: auto;
            color: white;
            text-transform: uppercase;
        }
    }

    form {
        /* border: 1px solid white; */
        height: 29vw;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        background-color: #55535376;
        border-radius: 2rem;
        padding: 2.2rem 3.2rem;
        input {
            background-color: transparent;    
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            
            font-size: 1rem;
            &:focus {
                border: 0.1rem solid #997af0;

                outline: none;
            }
        }
        button {
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover {

                background-color: #4e0eff;
            }
        }
        span {
            color: white;
            text-transform: uppercase;
            a {
                color: #4e0eff;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
`