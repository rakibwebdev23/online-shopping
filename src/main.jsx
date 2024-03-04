import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './component/Shop/Shop.jsx';
import Home from './component/Home/Home.jsx';
import Orders from './component/Orders/Orders.jsx';
import Inventory from './component/Inventory/Inventory.jsx';
import Login from './component/Login/Login.jsx';
import productLoaderData from './Loaders/Loaders.js';
import CheckOut from './component/CheckOut/CheckOut.jsx';

const router = createBrowserRouter([
  {
    path:"/", 
    element: <Home></Home>,
    children:[
      {
        path: "/",
        element: <Shop></Shop>,
      },
      {
        path: "orders",
        element: <Orders></Orders>,
        loader: productLoaderData,
      },
      {
        path:"checkout",
        element: <CheckOut></CheckOut>,
      },
      {
        path:"inventory",
        element: <Inventory></Inventory>,
      },
      {
        path:"login",
        element:<Login></Login>,
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
