
import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/Logo.jpg";
// npm install react-toastify for error handling module
import { registerRoute } from "../Utils/APIRoutes";

export const Register = () => {

    const [values, setValues ] = useState({

        username : "",
        email : "",
        password : "",
        confirmPassword : "",

    });

    const ErrorStyled = {
        position : "top-right",
        autoClose : 8000,    
        pauseOnHover : true,
        draggable : true,
        theme : "dark"
    }

    const navigate = useNavigate();



    useEffect(() => {
        if(localStorage.getItem("Chater-app-userRegister")) {
            navigate("/login");
        }
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()) {
            // alert("Hello");
            const { username, email, password } = values;
            console.log('password1:', password)
            console.log('email:', email)
            console.log('username:', username)
            const { data } = await axios.post(registerRoute,{
                username,
                email,
                password,
            });
            console.log('data:', data)

            if(data.status === false) {
                toast.error(data.message, ErrorStyled);
            }

            if(data.status === true) {
                localStorage.setItem("Chater-app-userRegister", JSON.stringify(data.user));
                navigate("/login")
            }

        };
        alert("");
    }

    const handleValidation = () => {
        // alert("");
        const { username, email, password, confirmPassword } = values;
        if(password !== confirmPassword) {
            toast.error("Password and ConfirmPassword should be matched",
                ErrorStyled
                // {
                //     position : "top-right",
                //     autoClose : 8000,
                    
                //     pauseOnHover : true,
                //     draggable : true,
                //     theme : "dark"
                // }
            )
            return false;
        }
        else if(password < 8) {
            toast.error("Password Should be greater or equal to 8 character", ErrorStyled);
            return false;
        }
        else if(email === "") {
            toast.error("Email Must be required", ErrorStyled);
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
                    <input onChange={handleChange} type="email" name="email" placeholder="Email....." />
                    <input onChange={handleChange} type="password" name="password" placeholder="Password....." />
                    <input onChange={handleChange} type="password" name="confirmPassword" placeholder="Confirm Password....." />
                    <button type="submit">Create User</button>
                    <span>Already have an account <Link to="/login">Login</Link> </span>
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
        height: 40vw;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        background-color: #55535376;
        border-radius: 2rem;
        padding: 2.2rem 4rem;
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