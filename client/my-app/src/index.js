import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import Register from './register';
import Home from './Home';
import Login from './Login';
import FieldSelector from './FieldSelector';
import Main from './Main';
import Profile from './Profile';
import PostJob from './PostJob';
import Company from './Company';
import Test from './Test';

const router=createBrowserRouter([{
  path:'/',
  element:<App/>
},{
  path:'/signup',
  element:<Register/>
},{
  path:'/login',
  element:<Login/>
},{
  path:'/interest',
  element:<FieldSelector/>
}
,{
  path:'/main',
  element:<Main/>
},{
  path:'/profile',
  element:<Profile/>
},
{
  path:'/postjob',
  element:<PostJob/>
},
{
  path:'/company',
  element:<Company/>
},
{
  path:'/skilltest',
  element:<Test/>
}
])
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
