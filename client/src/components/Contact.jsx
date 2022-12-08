
import { useState, useEffect } from "react";

import styled from "styled-components";
import Logo from "../assets/Logo.jpg";

export const Contact = ({ contacts, currentUser, changeChatFn }) => {
console.log('contacts:', contacts)

    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if(currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    },[currentUser])

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);

        changeChatFn(contact);
    }

    return (
        currentUserImage && currentUserName && (
            <>
                <Container>
                    <div className="brand">
                        <img src={Logo} alt="" />
                        <h3>Chatter</h3>
                    </div>
                    <div className="contacts">

                        {contacts.map((element,index) => {
                            return (
                                <div onClick={() => {
                                    changeCurrentChat(index,element)
                                }} key = {index} className={`contact ${index === currentSelected ? "selected" : ""}`}>
                                    <div className="avatar">
                                        <img src={`data:image/svg+xml;base64,${element.avatarImage}`} alt="avatar" />
                                    </div>
                                    <div className="username">
                                        <h3>{element.username}</h3>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="current-user">
                        <div className="avatar">
                            <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                        </div>
                        <div className="username">
                            <h2>{currentUserName}</h2>
                        </div>
                    </div>
                </Container>
            </>
        )
    )
}

const Container = styled.div`

    /* border: 1px solid white; */
    display: grid;

    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;
    .brand {
        /* border: 1px solid white; */
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img {
            
            height: 2rem;
        }
        h3 {
            color: white;
            text-transform: uppercase;
        }
    }
    .contacts {
        /* border: 1px solid white; */
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar {

            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }

        }
        .contact {

            background-color: #ffffff39;
            min-height: 5rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding: 0.4rem;
            gap: 1rem;
            display: flex;
            align-items: center;
            transition: 0.5s ease-in-out;
            .avatar {
                img {
                    height: 3rem;

                }
            };
            .username {
              h3 {
                  color: white;
              }  
            };
        }
        .selected {
            background-color: #9186f3;
        }
    }
    .current-user {
        background-color: #0d0d30;
        display: flex;
        
        justify-content: center;
        align-items: center;
        gap: 2rem;
        .avatar {
            img {
                height: 4rem;
                max-inline-size: 100%;
            }
        }
        
        .username {
            h2 {
                color: white;
            }
        }
        @media screen and (min-width : 720px) and (max-width : 1080px) {
            gap: 0.5rem;
            .username {
                h2 {
                    font-size: 1rem;
                }
            }
        }
        @media screen and (min-width : 360px) and (max-width : 720px) {
            gap: 0.1rem;
            .username {
                h2 {
                    font-size: .8rem;
                }
            }
        }
    }
`