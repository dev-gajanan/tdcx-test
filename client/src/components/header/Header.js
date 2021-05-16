import React, { useEffect, useState } from "react";
import './styles.css';
import styled from 'styled-components';
import { getUserInfo, isLoggedIn, removeUserInfo } from "../../utils/user-utils";
import { useHistory } from "react-router";

const LogoutButton = styled.button`
    cursor: pointer;
    background: transparent;
    font-size: 16px;
    padding: 0.25em 1em;
    transition: 0.5s all ease-out;
    border:none;
    &:hover {
        background-color: #eee;
        color: #333;
    }
`;

const Header = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [profileImage, setProfileImage] = useState('../../logo192.png');

    useEffect(()=> {
        if(!isLoggedIn()) {
            history.replace('/');
        }
        const userInfo = getUserInfo();
        if(userInfo) {
            setName(userInfo.name);
            if(userInfo.profileImage !== '') {
                setProfileImage(userInfo.profileImage);
            }
        }
    },[history])


    const handleLogout = () => {
        removeUserInfo();
        history.replace('/');
    }

    return <div className="navbar">
        <div className="container">
            <div className="navbar-left">
                <div className="brand">
                    <img src={profileImage} alt={name} className="logo" />
                    <span className="name">{name}</span>
                </div>
            </div>
            <div className="collapse">
                <ul className="nav-right">
                    <li className="nav-link">
                        <LogoutButton type="button" onClick={handleLogout}>Logout</LogoutButton>
                    </li>
                </ul>
            </div>
        </div>
    </div>
}
export default Header;