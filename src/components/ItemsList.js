import { useDispatch } from "react-redux";
import { addItem } from '../../utils/cartSlice'

const ItemsList = ({ items }) => {
  // console.log(items);

  const dispatch = useDispatch();
  const handleaddItem = (item) => {
    console.log(item);
    //click pe action dispatch hoga
    // Dispatch an Action
    dispatch(addItem(item));
    // "Pizza" is paylolad
    // so action.payload will be pizza
        
  };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="mb-2 border-b-2 border-solid border-gray-200 flex justify-between p-4"
        >
          <div>
            <span className="font-bold">{item.card.info.name + ' '}</span>
            <span>
             - ₹{item.card.info.defaultPrice / 100 || item.card.info.price / 100}
            </span>
            <p className="text-xs pt-1 max-w-[400px]">{item.card.info.description}</p>
          </div>

          <div className="w-2/12"> 
           <div className="absolute rounded-sm">
            <button className="px-2 bg-white rounded-tl-sm" onClick={() => handleaddItem(item)}>Add+</button>
           </div>  
          <img className="w-full h-auto object-cover rounded shadow-md"
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
              item.card.info.imageId
            }
            alt="dish-img"
          />
          </div>          
        </div>
      ))}
    </div>
  );
};

export default ItemsList;
