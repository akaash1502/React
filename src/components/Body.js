import RestaurantCard , {withPromotedLabel} from "./RestaurantCard";
import resList from "../../utils/mockdata";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useInternetStatus from "../../utils/useInternetStatus";
import UserContext from "../../utils/UserContext";
// import Cart from "./Cart";

const Body = () => {
  //Local state Variable = Superpowerful Variable
  // Hooks are JS functions given to us by React
  const [listofRestaurants, setList] = useState(resList);
  const [filteredRestaurants, setfilteredList] = useState(resList);

  const [searchtext, setsearchtext] = useState("");
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  const { loggedInUser, setusername } = useContext(UserContext);
  
  // useEffect(() => {
  //   fetchdata();
  // }, []);

  useEffect(() => {
    // If search text is empty, reset filtered list
    if (searchtext.trim() === "") {
      setfilteredList(listofRestaurants);
    }
  }, [searchtext, listofRestaurants]);

  // const fetchdata = async () => {
  //   // fetch data from API using this
  //   const data = await fetch(
  //     "https://www.swiggy.com/mapi/homepage/getCards?lat=30.900965&lng=75.8572758"
  //   );

  //   const json = await data.json();

   
  //   OLD
  //   setList(json?.data?.success?.cards[3]?.gridWidget?.gridElements?.infoWithStyle?.restaurants);
  //   setfilteredList(json?.data?.success?.cards[1]?.gridWidget?.gridElements?.infoWithStyle?.restaurants);
  // };

  const InternetStatus = useInternetStatus();

  if (InternetStatus === false) return <h1>Check Your Internet</h1>;

  //Conditional Rendering
  if (listofRestaurants.length === 0) {
    //Shimmer UI meanwhile page is loading
    return <Shimmer />;
    // return ;
  }

  return (
    <div className="body p-4">
      <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            placeholder="Type to search....."
            type="text"
            className="border border-solid border-black px-2 py-1 rounded-sm w-full sm:w-auto"
            value={searchtext}
            onChange={(e) => {
              setsearchtext(e.target.value);
            }}
          />

          <button
            className="px-4 py-1 bg-blue-400 rounded-sm sm:w-auto hover:bg-blue-500"
            onClick={() => {
              //implement a filter restaurant cards and update UI
              console.log(searchtext);
              if (searchtext.trim() === "") {
                setfilteredList(listofRestaurants);
              } else {
                const filteredrestaurant = listofRestaurants.filter((res) =>
                  res.info.name.toLowerCase().includes(searchtext.toLowerCase())
                );
                setfilteredList(filteredrestaurant);
              }
            }}
          >
            Search
          </button>
          <button
          className="px-2 py-1 bg-blue-400 rounded-sm sm:w-auto hover:bg-blue-500"
          onClick={() => {
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



        {/* <div>
          <label>UserName :</label>
          <input className="border border-black m-1 p-1" 
          value={loggedInUser}
          onChange={(e)=>{setusername(e.target.value)}}/>
        </div> */}


        
      </div>
      <div className="m-2 flex flex-wrap hover:ease-in">
        {filteredRestaurants.map((restaurant) => (
          <Link
            to={"/restaurant/" + restaurant.info.id}
            key={restaurant.info.id}
            className="res-link"
          >
            <RestaurantCardPromoted resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
