import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

export default function Home() {
    const [posts, setPosts] = useState([]);

    const fetchData = async () => {
        try {
            axios
                .get('http://127.0.0.1:8000/api/posts')
                .then(function (response) {
                    // handle success
                    setPosts(response.data);
                    // setTest(response.data);
                    console.log(response.data);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    useEffect(() => {

        fetchData();

        // Call the async function
    }, []);

    const handleBookmarkBlog = (post_id) => {
        let userId = 1;

        axios.post(`http://127.0.0.1:8000/api/bookmarks/store/${userId}`, {
            post_id: 5000,
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    const handleGoogleSignIn = (credentialResponse) => {
        let base64Url = credentialResponse.credential.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(
            window
                .atob(base64)
                .split('')
                .map(function (c) {
                    return (
                        '%' +
                        ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join(''),
        );

        axios.post(`http://127.0.0.1:8000/api/auth/login`, {
                clientId: credentialResponse.clientId,
                credential: credentialResponse.credential,
                payload: JSON.parse(jsonPayload),
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        console.log(credentialResponse);
        console.log(JSON.parse(jsonPayload));
    };

    return (
        <>
            {/* Navigation*/}
            <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
                <div className="container px-4 px-lg-5">
                    <Link className="navbar-brand" to="/">
                        Start Bootstrap
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarResponsive"
                        aria-controls="navbarResponsive"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        Menu
                        <i className="fas fa-bars" />
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarResponsive"
                    >
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link
                                    to="/blog/create"
                                    className="nav-link"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <button
                                        style={{
                                            backgroundColor: 'blue',
                                            color: 'white',
                                            border: 'none',
                                            padding: '10px 20px',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            fontSize: '16px',
                                        }}
                                    >
                                        Create Blog
                                    </button>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <GoogleLogin
                                    onSuccess={handleGoogleSignIn}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto py-4 py-lg-0">
                            <li className="nav-item">
                                <Link
                                    className="nav-link px-lg-3 py-3 py-lg-4"
                                    to="/"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link px-lg-3 py-3 py-lg-4"
                                    to="/about"
                                >
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link px-lg-3 py-3 py-lg-4"
                                    to="/post"
                                >
                                    Sample Post
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link px-lg-3 py-3 py-lg-4"
                                    to="/contact"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '50%',
                                        width: '40px',
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#007bff',
                                    }}
                                >
                                    <i className="bi bi-person-circle"></i>
                                </a>
                                <ul
                                    className="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="navbarDropdown"
                                >
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/dashboard"
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/create-post"
                                        >
                                            Create Post
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/reading-list"
                                        >
                                            Reading list
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/settings"
                                        >
                                            Settings
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/sign-out"
                                        >
                                            Sign Out
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* Page Header*/}
            <header
                className="masthead"
                style={{
                    backgroundImage: 'url("/src/assets/img/home-bg.jpg")',
                }}
            >
                <div className="container position-relative px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="site-heading">
                                <h1>Clean Blog</h1>
                                <span className="subheading">
                                    A Blog Theme by Start Bootstrap
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* Main Content*/}
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center"></div>
            </div>
            <div id="container"></div>
            <PaginatedItems
                itemsPerPage={1}
                items={posts}
                handleBookmarkBlog={handleBookmarkBlog}
            />
            <footer className="border-top">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <ul className="list-inline text-center">
                                <li className="list-inline-item">
                                    <a href="#!">
                                        <span className="fa-stack fa-lg">
                                            <i className="fas fa-circle fa-stack-2x" />
                                            <i className="fab fa-twitter fa-stack-1x fa-inverse" />
                                        </span>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#!">
                                        <span className="fa-stack fa-lg">
                                            <i className="fas fa-circle fa-stack-2x" />
                                            <i className="fab fa-facebook-f fa-stack-1x fa-inverse" />
                                        </span>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#!">
                                        <span className="fa-stack fa-lg">
                                            <i className="fas fa-circle fa-stack-2x" />
                                            <i className="fab fa-github fa-stack-1x fa-inverse" />
                                        </span>
                                    </a>
                                </li>
                            </ul>
                            <div className="small text-center text-muted fst-italic">
                                Copyright © Your Website 2023
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

function PaginatedItems({ itemsPerPage, items, handleBookmarkBlog }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`,
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <div className="col-md-10 col-lg-8 col-xl-7">
                {/* Post preview*/}
                {currentItems.map((post) => (
                    <div key={post.id}>
                        <div className="post-preview">
                            <Link to={`blog/${post.title}`}>Your Name</Link>
                            <a href={`blog/${post.id}`}>
                                <h2 className="post-title">{post.title}</h2>
                                <h3 className="post-subtitle">
                                    Problems look mighty small from 150 miles up
                                </h3>
                            </a>
                            <p className="post-meta">
                                Posted by
                                <a href="#!">Start Bootstrap</a>
                                on {post.publishedAt}
                            </p>
                            <Link to={`blog/edit/${post.id}`}>Edit</Link>

                            <button
                                style={{
                                    border: 'none',
                                    background: 'none',
                                    padding: 0,
                                }}
                                onClick={() => handleBookmarkBlog(post.id)}
                            >
                                <i className="fa-regular fa-bookmark ml-5"></i>
                            </button>
                        </div>
                        {/* Divider*/}
                        <hr className="my-4" />
                    </div>
                ))}
                {/* Pager*/}
                <div className="d-flex justify-content-end mb-4">
                    <a className="btn btn-primary text-uppercase" href="#!">
                        Older Posts →
                    </a>
                </div>
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                marginPagesDisplayed={2}
                containerClassName="pagination"
                activeClassName="active"
            />
        </>
    );
}

// Add a <div id="container"> to your HTML to see the component rendered.
// ReactDOM.render(
//     <PaginatedItems itemsPerPage={4} />,
//     document.getElementById('container'),
// );
