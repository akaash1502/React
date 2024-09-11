import { CDN_URL } from "../../utils/constants";

const styleCard = {
    backgroundColor: "#f0f0f0",
};

const RestaurantCard = (props) => {
    const {resData} = props;
  
    const {
      cloudinaryImageId,
      name,
      avgRating,
      cuisines,
      costForTwo,
      deliveryTime} = resData?.info;
  
    return (
      <div className="m-2 p-3 bg-gray-100 w-[225px] h-[400px] box-border rounded-lg hover:bg-gray-200 hover:shadow-lg hover:-translate-y-1 transform transition duration-200">
        <img
          className="rounded-lg w-full"
          alt="res-logo"
          src={CDN_URL
            +cloudinaryImageId}
        />
        <div className="flex flex-col flex-grow">
           <h3 className="font-bold py-1 text-lg">{name}</h3>
           <h4>{cuisines.join(", ")}</h4>
           <h4>{avgRating + " Stars ⭐"}</h4>
           <p>{costForTwo}</p>
           <p>{deliveryTime}</p>
        </div>
        
      </div>
    );
  };


  //Higher Order Component
  // Input - Restaurant Card
  // Output - Restaurant Card Promoted
  export const withPromotedLabel = (RestaurantCard) => {
    return (props) => {
      const { resData } = props;
  
      // Check if restaurant is promoted
      const { promoted } = resData?.info;
  
      return (
        <div className="relative hover:-translate-y-1 transform transition duration-200">
          {promoted && (
            <div className="absolute top-0 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
              Promoted
            </div>
          )}
          <RestaurantCard {...props} />
        </div>
      );
    };
  };




  export default RestaurantCard;