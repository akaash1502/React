import RestaurantCard from "./RestaurantCard";
import resList from "../../utils/mockdata";
import { useEffect, useReducer, useState } from "react";
import Shimmer from "./Shimmer";


const Body = () => {
  //Local state Variable = Superpowerful Variable
  // Hooks are JS functions given to us by React
  const [listofRestaurants,setList] = useState(resList);  
  const [filteredRestaurants,setfilteredList] = useState(resList);

  const [searchtext,setsearchtext] = useState("");
  //
  useEffect(()=>{
    fetchdata();
  },[]);
  
  const fetchdata = async () => {
    // fetch data from API using this
    const data = await fetch(
      "https://www.swiggy.com/mapi/homepage/getCards?lat=31.395993917938036&lng=75.53563865788118"
    );
    
    const json = await data.json();
    console.log(json);
    setList(json?.data?.success?.cards[3]?.gridWidget?.gridElements?.infoWithStyle?.restaurants);
    setfilteredList(json?.data?.success?.cards[1]?.gridWidget?.gridElements?.infoWithStyle?.restaurants);
  };



  //Conditional Rendering  
  if(listofRestaurants.length===0){
    //Shimmer UI meanwhile page is loading
    return <Shimmer />;
    // return ;
  }

    return (
      <div className="body">
        <div className="filter">
          <div className="search-container">
            <input type="text" className="search-box" value={searchtext} onChange={(e)=>{
              setsearchtext(e.target.value);
            }}/>

            <button onClick={()=> {
              //implement a filter restaurant cards and update UI
              console.log(searchtext);
              if (searchtext.trim() === "") {
                setfilteredList(listofRestaurants);
              } 
              else{const filteredrestaurant = listofRestaurants.filter((res) => 
                res.info.name.toLowerCase().includes(searchtext.toLowerCase())
            );
                setfilteredList(filteredrestaurant);}

            }}>
              Search
            </button>
          </div>
            <button 
            className="filter-btn" 
            onClick={()=>{
                //filter logic likhna hai
                const filteredList = listofRestaurants.filter(
                    (res) => res.info.avgRating > 4.5
                );
                setfilteredList(filteredList);
                console.log(filteredList);
            }}
            >
                Top Rated Restaurants
            </button>
        </div>
        <div className="res-Container">
          {
            //map use karo for looping
            //for each restaurant, return a piece of JSX
            filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.info.id} resData={restaurant}/>
              ))
          }
        </div>
      </div>
  
    );
};

export default Body;
  