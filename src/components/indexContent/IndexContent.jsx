import React from "react";
import CarouselComponent from "./Carousel.jsx";
import ListInterestComponent from "./ListInterestComponent.jsx";
export default function IndexContent (){
    return (
        <div className="w-75 responsive-design mx-auto mt-5">
        
            <div className="w-75 mx-auto ">
                <CarouselComponent />
            </div>
        
            
            <div className="w-50 mx-5 mt-5">
                <ListInterestComponent />
            </div>
            
        </div>
        



    )
}