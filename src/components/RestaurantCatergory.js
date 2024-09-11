import ItemsList from "./ItemsList";
// import useRestaurantMenu from "../../utils/useRestaurantMenu";
import { useState } from "react";

const RestaurantCategory = ({ data , showItems, setshowIndex }) => {

    // const [showItems,setshowItems] = useState(false);
    // const [arrow,setarrow] = useState('⬇');
    
    // console.log(data);
    const handleClick = () => {
        // setshowItems(!showItems);
        setshowIndex(); 
        // arrow === '⬇' ? setarrow('⬆') : setarrow('⬇');
        // console.log('Hello');      
        
    }
    return (
        <div className="w-full mx-auto">
            {/* Accordion Header */}
            <div className="w-[100%] my-3 bg-gray-100 shadow-lg p-4">
                <div className="flex flex-row justify-between cursor-pointer" onClick={handleClick}>
                    <span className="font-bold text-lg">
                        {data.title} ({data.itemCards.length})
                    </span>
                    <span>{showItems ? '⬆' : '⬇'}</span>
                </div>
                {showItems && <ItemsList items={data.itemCards} />}
            </div>                                  
        </div>      
    );
}

export default RestaurantCategory;