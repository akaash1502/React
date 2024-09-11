import { useDispatch, useSelector } from "react-redux";
// import ItemsList from "./ItemsList";
import ItemsList from "./ItemsList"
import { clearCart } from "./cartSlice";
import cartimg from "../../Assets/emptycart.png"

const Cart = () => {
    // const addedItems = c artSlice.init
    const cartItems = useSelector((store)=>store.cart.items);

    const dispatch = useDispatch();
    const handleClearCart = () => {
        dispatch(clearCart());        
    };
    return (
        <div className="text-center m-4 p-4">
            <h1 className="text-2xl font-bold">Cart</h1> 

            <div className="m-auto mt-4 w-6/12">
                <button className="bg-slate-400 rounded-lg p-1" 
                onClick={handleClearCart}>
                    Clear Cart
                </button>
                {cartItems.length === 0 && 
                <div className="w-6/12 m-auto mt-8 flex flex-col">
                    <h1>Cart is Empty, Please add Items to cart</h1>
                    <img src={cartimg} alt="empty-cart-img"/>                    
                </div>}
                <ItemsList items={cartItems} />
            </div>         
        </div>

    );
};

export default Cart;