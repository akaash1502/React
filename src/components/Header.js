import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo_final.png";
import UserContext from "../../utils/UserContext";
import useInternetStatus from "../../utils/useInternetStatus";
import { useSelector } from "react-redux";



const Header = () => {
  const [btnNameReact,setbtnNameReact] = useState("Login");

  const { loggedInUser } = useContext(UserContext);
  console.log(loggedInUser);
  
  //Selector will give access to store
  // Subscribing to the store using selector
  const cartItems = useSelector((store) => store.cart.items);
 
    return (
      <div className="bg-slate-50 shadow-md mb-3 px-6 py-4 flex items-center justify-between">
          <Link to='/'>
          <img
            className="w-20  h-auto hover:scale-105 transform transition duration-200"
            src={logo}
            alt="Swiggy Logo"
          />
          </Link>
          
        <div className="flex items-center space-x-6"> 
          <ul className="flex items-center space-x-4 text-gray-700">
            <li>
              <Link to="/" className="hover:text-blue-500">Home</Link>
            </li>
            <li>
            <Link to="/about" className="hover:text-blue-500">About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-500">Contact Us</Link>
            </li>
            <li>
              <Link to="/grocery" className="hover:text-blue-500">Grocery</Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-blue-500 font-bold">Cart - ({cartItems.length})</Link>
            </li>
            {/* Want Dynamic Button */}
            <button className="bg-blue-500 text-white w-20 pb-[3px] h-auto rounded-lg hover:bg-blue-600 transition" 
            onClick={()=>{ 
              btnNameReact === "Login" 
              ? setbtnNameReact("Logout") 
              : setbtnNameReact("Login")
              }}
              >{btnNameReact}
            </button>
            <li className="font-bold">{loggedInUser}</li>
          </ul>
        </div>
      </div>
    )
}

export default Header;
