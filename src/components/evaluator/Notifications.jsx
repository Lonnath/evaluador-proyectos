import React, {useState, useEffect} from "react";
import { Alert } from "react-bootstrap";
export default function Notifications({inicial}){
    return(
        <>
            <Alert variant="info" className="alertP">Nuevo Proyecto Asignado</Alert>
        </>
    );
}