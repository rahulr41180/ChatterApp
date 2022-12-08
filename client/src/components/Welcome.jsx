
import styled from "styled-components";

import RobotLogo from "../assets/Welcome.gif";

export const Welcome = ({ currentUser }) => {
console.log('currentUser:', currentUser)

    return (
        <>
            <Container>
                <img src={RobotLogo} alt="" />
                <h1>

                    Welcome, <span>{currentUser === undefined ? "" : currentUser.username}!</span>

                </h1>
                <h3>Please select a chat to start Messaging.</h3>
            </Container>
        </>
    )

}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    gap: .5rem;
    img {
        height: 15rem;
    }

    span {
        color: #4e00ff;
    }
`