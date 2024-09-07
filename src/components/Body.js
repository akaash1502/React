import RestaurantCard , {withPromotedLabel} from "./RestaurantCard";
import resList from "../../utils/mockdata";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useInternetStatus from "../../utils/useInternetStatus";

const Body = () => {
  //Local state Variable = Superpowerful Variable
  // Hooks are JS functions given to us by React
  const [listofRestaurants, setList] = useState(resList);
  const [filteredRestaurants, setfilteredList] = useState(resList);

  const [searchtext, setsearchtext] = useState("");
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  //
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
    // fetch data from API using this
    // const data = await fetch(
      // "https://www.swiggy.com/mapi/homepage/getCards?lat=31.395993917938036&lng=75.53563865788118"
    // );

    // const json = await data.json();

    //NEW

    // const restaurants =
      // json?.data?.success?.cards[3]?.gridWidget?.gridElements?.infoWithStyle?.restaurants || [];

    // Updated state with fetched restaurants
    // setList(restaurants);
    // setfilteredList(restaurants);

    //OLD
    // setList(json?.data?.success?.cards[3]?.gridWidget?.gridElements?.infoWithStyle?.restaurants);
    // setfilteredList(json?.data?.success?.cards[1]?.gridWidget?.gridElements?.infoWithStyle?.restaurants);
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
            className="px-4 py-1 bg-green-200 rounded-sm sm:w-auto hover:bg-green-300"
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
        </div>
        <button
          className="px-2 py-1 bg-green-200 rounded-sm sm:w-auto hover:bg-green-300"
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
      <div className="m-2 flex flex-wrap justify-between hover:ease-in">
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
