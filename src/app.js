import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/contact";
import Error from "./components/Error";
// import RestaurantMenu from "./components/RestaurantMenu";
import RestaurantMenu from "./components/RestaurantMenu";
// import Grocery from "./components/Grocery";
import UserContext from "../utils/UserContext";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import Cart from "./Cart";



const Grocery = lazy(() => import("./components/Grocery"));

const AppLayout = () => {
  
  //Authentication hai suppose
  const [username,setusername] = useState();

  useEffect(()=>{ 
    //Make an API call and send user name and password wo data mein aayega
    // say data mein ye aa gya suppose
    const data = {
      username: 'Akash',
    };
    setusername(data.username);
  },[])


  return ( 
    <Provider store={appStore}>
      <UserContext.Provider value={{loggedInUser: username, setusername}}>
      <div className="app">
      <Header />
      {/* if path is / then body */}
      {/* <Body /> */}
      {/* Outlet mein Body aajega jab path / hojega, /about toh About, /contact to Contact wala part render ho jaayega
       Header wahin ka wahin rahega */}
      <Outlet />
    </div>
    </UserContext.Provider>  
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    // Root route /about is children of app layout
    path: "/",
    element:<AppLayout />,
    children: [
      {
        path:"/",
        element: <Body />
      },
      {
        path:"/about",
        element:<About />,
      },
      {
        path:"/contact",
        element:<Contact />,
      },
      {
        path:"/grocery",
        element:<Suspense fallback={<h1>Loading...</h1>}><Grocery /></Suspense>
      },
      { 
        path:"/restaurant/:resId",
        // resID restaurant ke hisab se change hoga
        // Dynamic part chaahiye /restaurants ke aage
        element:<RestaurantMenu />
      },
      {
        path: "/cart",
        element: <Cart />
      }
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<AppLayout />)
root.render(<RouterProvider router={appRouter}/>);
