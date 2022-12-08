
import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";

import { BiPowerOff} from "react-icons/bi";

export const Logout = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {

        localStorage.clear();
        navigate("/login")

    }

    return (
        <Button>
            <BiPowerOff onClick={handleLogout} />
        </Button>
    )

}

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;

    background-color: #9a86f3;
    border: none;
    cursor: pointer;
    svg {
        font-size: 1.5rem;
        color: #ebe7ff;
    }
`