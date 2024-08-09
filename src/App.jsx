import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BlogDetails from './BlogDetails';
import CreateBlog from './CreateBlog';
import EditBlog from './EditBlog';
import Home from './Home';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: 'blog/:title',
            element: <BlogDetails />,
        },
        {
            path: 'blog/create',
            element: <CreateBlog />,
        },
        {
            path: 'blog/edit/:id',
            element: <EditBlog />,
        },
    ]);

    return ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <GoogleOAuthProvider clientId="337289495699-7crc1jr3kcnankb2ket85b3hcfhlu2fk.apps.googleusercontent.com">
                <RouterProvider router={router} />
            </GoogleOAuthProvider>
        </React.StrictMode>,
    );
}

export default App;
