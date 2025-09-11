import React from "react";
import ReactDOM from "react-dom/client";
import { About } from "./component/About";
import Contact from "./component/Contact";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Articles } from "./component/Articles";
import { Article } from "./component/Article";
import ErrorPage from "./component/ErrorPage";
import SearchResult from "./component/search/SearchResult";
import { Header, Footer } from "./component/Main";
import NewArticle from "./component/NewArticle";
import { Home } from "./component/Home";

// レイアウトコンポーネント
const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet /> {/* 子ルートがここに表示される */}
      <Footer />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [],
  },
  {
    path: "/search",
    element: <SearchResult />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/newArticle",
    element: <NewArticle />,
  },
  {
    path: "/articles",
    element: <Articles />,
  },
  {
    path: "/article/:id",
    element: <Article />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
