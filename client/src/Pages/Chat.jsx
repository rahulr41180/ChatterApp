
import styled from "styled-components";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { allUserRoute, host } from "../Utils/APIRoutes";
import { Contact } from "../components/Contact";
import { Welcome } from "../components/Welcome";
import { ChatContainer } from "../components/ChatContainer";
import { io } from "socket.io-client";

export const Chat = () => {

    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const socket = useRef()
    console.log('currentUser:', currentUser)


    const navigate = useNavigate();

    useEffect(() => {
        
        const Check = async () => {
            if(!localStorage.getItem("Chater-app-userLogin")) {
                navigate("/login");
            }
            else {
                
                setCurrentUser(await JSON.parse(localStorage.getItem("Chater-app-userLogin")))

                setIsLoaded(true);
            }
        }
        Check();
    },[])
    

    useEffect(() => {

        if(currentUser) {
            socket.current = io(host)
            socket.current.emit("add-user", currentUser._id);
        }

    },[currentUser])
    useEffect(() => {
        getUsers();
    },[currentUser])
    
    const getUsers = async () => {
        if(currentUser) {
            console.log('currentUser1:', currentUser)
            if(currentUser.isAvatarImageSet) {
                console.log('isAvatarImageSet:', currentUser.isAvatarImageSet)
                const data = await axios.get(`${allUserRoute}/${currentUser._id}`)
                console.log('data:', data)
                setContacts(data.data.Users);

                console.log('contacts:', contacts)
            }
            else {
                navigate("/setAvatar")
            }
        }
    }

    const handleCurrentChat = (chat) => {

        setCurrentChat(chat);

    }

    return (
        <>
            <Container>
                <div className="container">
                    <Contact contacts = {contacts} currentUser = {currentUser} changeChatFn = {handleCurrentChat} />
                    {

                        isLoaded && currentChat === undefined ? (
                        <Welcome currentUser = {currentUser} />
                        ) : (
                            <ChatContainer currentUser = {currentUser} currentChat = {currentChat} socket = { socket } />
                        )
                    }
                </div>
            </Container>
        </>
    )
}
const Container = styled.div`
    /* border: 1px solid; */
    height: 100vh;
    width: 100vw;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #050527;
    .container {
        /* border: 1px solid white; */
        height: 85vh;
        width: 85vw;
        
        background-color: #55535376;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width : 720px) and (max-width : 1080px) {
            grid-template-columns: 35% 65%;
        }
        @media screen and (min-width : 160px) and (max-width : 720px) {
            /* border: 1px solid yellow ; */
            grid-template-columns: 98%;
        }
    }
`