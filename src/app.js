import React, { lazy, Suspense } from "react";
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



const Grocery = lazy(() => import("./components/Grocery"));

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      {/* if path is / then body */}
      {/* <Body /> */}
      {/* Outlet mein Body aajega jab path / hojega, /about toh About, /contact to Contact wala part render ho jaayega
       Header wahin ka wahin rahega */}
      <Outlet />
    </div>
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
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<AppLayout />)
root.render(<RouterProvider router={appRouter}/>);
