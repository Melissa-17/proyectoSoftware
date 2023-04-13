import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useState } from "react";
import { Dropdown } from "bootstrap";

const SidebarLink = styled(Link)`
    display: flex;
    color: #f5f5f5;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    list-style: none;
    height: 45px;
    text-decoration: none;
    font-size: 16px;
    &:hover{
        color: #fff;
        background: #205492;
        cursor: pointer;
        border-radius: 8px;
        margin-left: 2%;
    }
`;

const SidebarDropdown = styled.div`
    display: flex;
    color: #f5f5f5;
    justify-content: space-between;
    align-items: center;
    padding: 6px;
    list-style: none;
    height: 40px;
    text-decoration: none;
    font-size: 16px;
    &:hover{
        color: #fff;
        background: #205492;
        cursor: pointer;
        border-radius: 8px;
        margin-left: 2%;
    }
`;


const SidebarLabel = styled.span`
    margin-left: 10px;
`;

const DropdownLink = styled(Link)`
    background: #042354;
    // color: #e1e9fc;
    color: #f5f5f5;
    height: 35px;
    padding-left: 0.5rem;
    display: flex;
    list-style: none;
    align-items: center;
    text-decoration: none;
    font-size: 14px;
    &:hover{
        color: #fff;
        background: #205492;
        cursor: pointer;
        border-radius: 8px;
        margin-right: 2%;
        margin-left: 1%
    }
`;

const Submenu = ({item}) => {
    const [subnav,setSubnav] = useState(false)
    const showSubnav = () => setSubnav(!subnav)
    return(
        <>
            {
                item.path
                ?
                <SidebarLink 
                to={item.path ? item.path : "#"} 
                onClick={item.subNav &&
                    showSubnav}
                >
                    <div>
                        {item.icon}
                        <SidebarLabel>{item.title}</SidebarLabel>
                    </div>
                    <div>
                        {item.subNav && subnav 
                        ? item.iconOpened 
                        : item.subNav 
                        ? item.iconClosed 
                        : null}
                    </div>
                </SidebarLink>
                :
                <SidebarDropdown 
                onClick={item.subNav &&
                    showSubnav}
                >
                    <div>
                        {item.icon}
                        <SidebarLabel>{item.title}</SidebarLabel>
                    </div>
                    <div>
                        {item.subNav && subnav 
                        ? item.iconOpened 
                        : item.subNav 
                        ? item.iconClosed 
                        : null}
                    </div>
                </SidebarDropdown>
            }
            
            {subnav && item.subNav.map((item,index) => {
                return(
                    <DropdownLink to={item.path} key={index}>
                        {item.icon}
                        <SidebarLabel>{item.title}</SidebarLabel>
                    </DropdownLink>
                )
            })}
        </>
    )
}

export default Submenu