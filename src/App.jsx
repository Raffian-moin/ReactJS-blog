import * as React from "react";
import * as ReactDOM from "react-dom/client";
import
    {
        createBrowserRouter,
        RouterProvider,
    } from "react-router-dom";
import BlogDetails from './BlogDetails';
import CreateBlog from "./CreateBlog";
import EditBlog from "./EditBlog";
import Home from './Home';

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "blog/:title",
            element: <BlogDetails />,
        },
        {
            path: "blog/create",
            element: <CreateBlog />,
        },
        {
            path: "blog/edit/:title",
            element: <EditBlog />,
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