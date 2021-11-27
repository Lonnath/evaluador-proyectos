import React, {useState, useEffect} from "react";
import { Alert } from "react-bootstrap";
export default function Notifications(){
    const [alerts, setAlerts] = useState("");
    const [alertsOn, setAlertsOn] = useState(true);
    const addAlert = () => {
        setAlerts(<Alert variant="info" className="alertP">Nuevo Proyecto Asignado</Alert>);
        setAlertsOn(false);
    };
    const eraseAlert = () => {
        setAlerts("");
        setAlertsOn(true);
    }
    
    useEffect(() => {
        setInterval(function(){ 
            alertsOn ? 
                addAlert()
            : eraseAlert()   
            }, 2000);
    });
    return(
        <>
            {alerts}
        </>
    );
}