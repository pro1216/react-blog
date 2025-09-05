import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './component/App';
import {About} from './component/About';
import {Contact} from './component/Contact';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { Articles } from './component/Articles';
import { Article } from './component/Article';
import { NewArticle } from './component/NewArticle';
import { elements } from 'chart.js';

const router = createBrowserRouter([
    {
      path:"/",
      element:<App/>,
      
    },
   
    {
      path:"/about",
      element:<About/>,
    },
    {
      path:"/contact",
      element : <Contact/>,
    },
    {
      path:"/newArticle",
      element : <NewArticle/>,
    },
    {
      path:"/articles",
      element : <Articles/>,
    },
    {
      path:"/article/:id",
      element : <Article/>,
    }

]);

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <RouterProvider router = {router}/>
    </React.StrictMode>
);
