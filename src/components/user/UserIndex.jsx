import React from "react";
import ListProjects from '../projectactions/ListProjects';
export default function UserIndex(){
    return(
        <div className="d-flex">
            <div className="w-75 ms-5 list-assign-eval mt-4">
                <ListProjects />
            </div>
            
        </div>
        
    )
}