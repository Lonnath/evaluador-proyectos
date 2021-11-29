import React from "react";
import ListProjects from "../projectactions/ListProjects";
export default function EvaluatorIndex(){
    return(
        <div>
            <ListProjects admin={false} />
        </div>
        
    )
}