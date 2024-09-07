import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { CDN_URL } from "../../utils/constants";
import useRestaurantMenu from "../../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  // const {resId} = useParams();
  // console.log()

  // const [resInfo, setresInfo] = useState(null);
  const { resId } = useParams();
  // console.log(params);

  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null) {
    return <Shimmer />;
  }

  const { name, cuisines, cloudinaryImageId, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;

  const { itemCards } =
    resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card
      ?.card || [];
  console.log(itemCards);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 border border-gray-300 bg-gray-50 rounded-lg">
        <div className="flex-1 ml-4">
          <h1 className="text-3xl font-bold mb-2 space-x-4">{name}</h1>
          <p className="text-lg text-gray-600">{cuisines.join(", ")} - {costForTwoMessage}</p>
          <h2 className="mt-4 text-2xl font-semibol">Menu</h2>
        </div>
        <img
          className="w-[50%] md:w-60 rounded-lg shadow-lg"
          src={CDN_URL + cloudinaryImageId}
          alt="Res-Image"
        />
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <ul className="space-y-4">
          {/* <li>Domino</li> */}
          {itemCards.map((item) => (
            <li 
            className="items-center border-b border-gray-200 pb-4 hover:bg-gray-100 transition duration-200 ease-in-out" 
            key={item.card.info.id}>
              <div className="flex justify-between items-center">
                <div className="text-lg font-medium">
                  {item.card.info.name} - ₹{item.card.info.price / 100}
                </div>
                <img
                  className="w-24 h-24 rounded object-cover"
                  src={
                    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                    item.card.info.imageId
                  }
                  alt="Dish-Image"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
