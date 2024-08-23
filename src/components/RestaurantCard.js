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
      <div className="res-card" style={styleCard}>
        <img
          className="res-logo"
          alt="res-logo"
          src={CDN_URL
            +cloudinaryImageId}
        />
        <h3>{name}</h3>
        <h4>{cuisines.join(", ")}</h4>
        <h4>{avgRating + " Stars"}</h4>
        <p>{costForTwo}</p>
        <p>{deliveryTime}</p>
      </div>
    );
  };

  export default RestaurantCard;