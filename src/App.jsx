import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Home'
import Blog from './Blog'
import CreateBlog from "./CreateBlog";

function App() {
    const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "blog/:title",
        element: <Blog />,
    },
    {
        path: "blog/create",
        element: <CreateBlog />,
    },
    ]);
    return (
        ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
        )
    )
}

export default App