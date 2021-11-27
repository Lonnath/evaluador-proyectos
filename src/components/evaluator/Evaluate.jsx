import React from "react";
import ListAssign from './ListAssign';
import Notifications from './Notifications';
export default function Evaluate(){
    return(
        <div className="d-flex">
            <div className="w-75 ms-5 list-assign-eval mt-4">
                <ListAssign />
            </div>
            <div className="w-25 ms-5 list-assign-eval mt-4">
                <Notifications />
            </div>
        </div>
        
    )
}