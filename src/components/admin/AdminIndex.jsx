import React from "react";
import ListProjects from "../projectactions/ListProjects";
export default function AdminIndex(){
    return(
        <>
            <ListProjects admin ={true}/>
        </>
    );
}