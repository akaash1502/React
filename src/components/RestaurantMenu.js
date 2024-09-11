import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { CDN_URL } from "../../utils/constants";
import useRestaurantMenu from "../../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCatergory";
import image from "../../Assets/images.png"
import { useState } from "react";

const RestaurantMenu = () => {
  // const {resId} = useParams();
  // console.log()

  // const [resInfo, setresInfo] = useState(null);
  const { resId } = useParams();
  // console.log(params);

  const resInfo = useRestaurantMenu(resId);

  const handleSetShowIndex = (index) => {
    // Toggle the accordion open/close based on current state
    setshowIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const [showIndex,setshowIndex] = useState(null);

  if (resInfo === null) {
    return <Shimmer />;
  }

  const { name, cuisines, cloudinaryImageId, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;

  const { itemCards } =
    resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card
      ?.card || [];
  // console.log(resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
  
  const categories = resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c => c.card?.card?.["@type"] === 
    "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
   );
   //filter kardi items wali
  //  console.log(categories);




  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 border border-gray-300 bg-gray-50 rounded-lg">
        <div className="flex-1 ml-4">
          <h1 className="text-3xl font-bold mb-2 space-x-4">{name}</h1>
          <p className="text-lg text-gray-600">{cuisines.join(", ")} - {costForTwoMessage}</p>
          <h2 className="mt-4 text-2xl font-semibol">Menu</h2>
        </div>
        <img
          className="w-48 rounded-lg shadow-lg"
          src={CDN_URL + cloudinaryImageId || image} 
          alt="Res-Image"
        />
      </div>
      {/* categories accordion*/}
      <div className="flex flex-col items-center">
      {categories.map((category, index)=> 
      // controlled component
      (<RestaurantCategory 
       key={category?.card?.card?.title} 
       data={category?.card?.card}
       showItems = {index===showIndex}
      //  function it will be called index
      setshowIndex={() => handleSetShowIndex(index)}
      //  
       />
       ))}
      </div>
  
    </div>
  );
};

export default RestaurantMenu;
