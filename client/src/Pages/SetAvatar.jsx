
import { useState, useEffect } from "react";

import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// npm install react-toastify for error handling module
// npm install buffer for get multiple images;
import Loader from "../assets/Loader.gif";
import { setAvatarRoute } from "../Utils/APIRoutes";

import { Buffer } from "buffer";

export const SetAvatar = () => {
    const api = "https://api.multiavatar.com/45678945";
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    console.log('selectedAvatar:', selectedAvatar)

    useEffect(() => {
        const Check = async () => {
            if(!localStorage.getItem("Chater-app-userLogin")) {
                navigate("/login");
            }
        }
        Check();
    },[])
    const ErrorStyled = {
        position : "top-right",
        autoClose : 8000,    
        pauseOnHover : true,
        draggable : true,
        theme : "dark"
    }

    const setProfilePicture = async () => {
        if(selectedAvatar === undefined) {
            toast.error("Please Select an avatar", ErrorStyled)
        }
        else {
            const user = await JSON.parse(localStorage.getItem("Chater-app-userLogin"));
            console.log('user:', user)
            const { data } = await axios.patch(`${setAvatarRoute}/${user._id}`, {
                // image : avatars[index];
                image : avatars[selectedAvatar]
            })
            console.log('data.isSet:', data.isSet)

            if(data.isSet) {
                console.log('user.isAvatarImageSet:', user.isAvatarImageSet)

                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("Chater-app-userLogin", JSON.stringify(user))
                navigate("/")
            }
            else {
                toast.error("Error setting avatar please try again", ErrorStyled)
            }
        }
    }

    useEffect(() => {

        getAvatars();

    },[])

    const getAvatars = async () => {
        const data = [];
        for(var i = 0; i<4; i++) {

            const image = await axios.get(`${api}/${Math.round(Math.random()*1000)}`)
            console.log('image:', image)
            const buffer = new Buffer(image.data);
            console.log('buffer:', buffer)
            data.push(buffer.toString("base64"));
            console.log('data:', data)
        }
        setAvatars(data);
        setIsLoading(false);
    }

    return (
        <>
            {
                isLoading ? <Container>
                    <img src={Loader} alt="" className="loader" />
                </Container> : (

                <Container>
                    <div className="title-container">
                        <h1>Pick an avatar as your profile picture</h1>
                    </div>
                    <div className="avatars">
                        {avatars.map((element,index) => {
                            return (
                                <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                                    <img onClick={() => 
                                        setSelectedAvatar(index)
                                    } src={`data:image/svg+xml;base64,${element}`} alt="avatar" />
                                </div>
                            )
                        })}
                    </div>
                    <button className="submit-btn" onClick={setProfilePicture}>Set As Profile Picture</button>
                </Container>
                )
            }
            <ToastContainer></ToastContainer>
        </>
    )
}
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;
    .loader {
        max-inline-size: 100%;
    }
    .title-container {
        h1 {
            color: white;
        }
    }
    .avatars {
        display: flex;
        gap: 2rem;
        .avatar {
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img {
                height: 6rem;
            }
        }
        .selected {
            border: 0.4rem solid #4e0eff;
        }
    }
    .submit-btn {
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
`