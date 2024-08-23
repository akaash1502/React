
// import { data } from "@remix-run/router/dist/utils";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
// import { useParams } from "react-router-dom";

const RestaurantMenu = () => {

    // const {resId} = useParams();
    // console.log()

    const [resInfo, setresInfo] = useState(null);

    useEffect(()=>{
        fetchMenu();        
    },[]);

    const fetchMenu = async () => {
        const data = await fetch(
            "https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7040592&lng=77.10249019999999&restaurantId=10208"
        );
        const json = await data.json();
        console.log(json);
        setresInfo(json?.data);
    };

    if(resInfo === null) {return <Shimmer />;}

    const {name,cuisines,cloudinaryImageId,costForTwoMessage} = resInfo?.cards[2]?.card?.card?.info;

    const {itemCards} = resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card;
    console.log(itemCards);

    return (
        <div className="particular-res">
            <div className="res-top">
            <h1>{name}</h1>
            <p>
            {cuisines.join(", ")} - {costForTwoMessage}
            </p>
            <h2>Menu</h2>
        </div>
        <div className="menu">
        <ul>
                {/* <li>Domino</li> */}
                {itemCards.map(item => 
                <li className="menu-li" key={item.card.info.id}>
                    <div className="item-container">
                    <div className="item-desc">
                        {item.card.info.name} - ₹{item.card.info.defaultPrice/100}
                    </div>
                    <img className="res-image" 
                        src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/"+item.card.info.imageId}                        
                    />                                                                        
                    </div>
                </li> )}
            </ul>
        </div>
        </div>
        
    );
};

export default RestaurantMenu;