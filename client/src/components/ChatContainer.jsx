
import styled from "styled-components";

import { Welcome } from "../components/Welcome";
import { Logout } from "./Logout";
import { ChatInput } from "./ChatInput";
import { MessageContainer } from "./MessageContainer";
import axios from "axios";
import { sendMessageRoute, getMessageRoute } from "../Utils/APIRoutes";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export const ChatContainer = ({ currentUser, currentChat, socket }) => {

    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef()
    console.log('messages:', messages)

    useEffect(() => {
        findMessage();
    },[currentChat]);

    const findMessage = async () => {

        if(currentChat) {

            const response = await axios.post(getMessageRoute, {
                from : currentUser._id,
                to : currentChat._id
            })
            setMessages(response.data)
        }

    }

    const handleSendMessage = async (msg) => {
        
        const { data } = await axios.post(sendMessageRoute,{
            from : currentUser._id,
            to : currentChat._id,
            message : msg
        })
        console.log('data:', data)
        socket.current.emit("send-msg", {
            to : currentChat._id,
            from : currentUser._id,
            message : msg,
        })

        const msgs = [...messages];
        msgs.push({fromSelf : true, message : msg});
        setMessages(msgs);

    }

    useEffect(() => {
        if(socket.current) {

            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf : false, message : msg })
            })

        }
    },[])

    useEffect(() => {

        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])

    },[arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour : "smooth"})
    },[messages])

    console.log('messagesatlast:', messages)

    return (
        <>
            <Container>
                <div className="chat-header">
                    <div className="user-details">
                        <div className="avatar">
                            {currentChat === undefined ? "" : <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />}
                        </div>
                        <div className="username">
                            <h3>{currentChat === undefined ? "" : currentChat.username}</h3>
                        </div>
                    </div>
                    <Logout />   
                </div>

                <div className="chat-messages">
                    {messages.map((element) => {
                        console.log('element:', element)
                        return (
                            <div ref={scrollRef} key = {uuidv4()}>
                                <div className={`message ${element.fromSelf ? "sended" : "recieved"}`}>
                                    <div className="content">
                                        <p>
                                            {element.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {/* <MessageContainer /> */}

                <ChatInput handleSendMsgFn = { handleSendMessage } />
            </Container>
        </>
    )

}

const Container = styled.div`
    padding-top: 1rem;

    display: grid;
    grid-template-rows: 10% 78% 12%;
    gap: 0.1rem;
    @media screen and (min-width : 720px) and (max-width : 1080px) {
        grid-template-rows: 15% 70% 15%;
    }
    @media screen and (min-width : 160px) and (max-width : 720px) {
        /* border: 1px solid yellow ; */
        grid-template-rows: 20% 60% 20%;
    }
    overflow: hidden;
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        padding: 0 2rem;
        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;
            
            .avatar {
                img {
                    height: 3rem;
                }
            }
            .username {
                h3 {
                    color: white;
                }
            }
        }
    }
    .chat-messages {
        /* border: 1px solid white; */
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .message {
            /* border: 1px solid yellow; */
            display: flex;
            align-items: center;
            .content {
                /* border: 1px solid red; */
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: #d1d1d1;



                @media screen and (min-width: 720px) and (max-width: 1080px) {
                    max-width: 70%;
                }
            }
        }
        .sended {
            justify-content: flex-end;
            .content {
                background-color: #4f04ff21;
            }
        }
        .recieved {
    
            justify-content: flex-start;
            .content {
                background-color: #9900ff20;
            }
    
        }
    }
`