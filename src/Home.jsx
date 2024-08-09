import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get(
                'https://newsapi.org/v2/everything?q=tesla&from=2024-07-16&sortBy=publishedAt&apiKey=201657a8ea1e494d84c4a6fb73c623af',
            )
            .then(function (response) {
                // handle success
                setPosts(response.data.articles);
                console.log(response.data.articles);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, []);

    return (
        <>
            {/* Navigation*/}
            <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
                <div className="container px-4 px-lg-5">
                    <a className="navbar-brand" href="index.html">
                        Start Bootstrap
                    </a>
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
                        <Link
                            to="/blog/create"
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
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                var base64Url =
                                    credentialResponse.credential.split('.')[1];
                                var base64 = base64Url
                                    .replace(/-/g, '+')
                                    .replace(/_/g, '/');
                                var jsonPayload = decodeURIComponent(
                                    window
                                        .atob(base64)
                                        .split('')
                                        .map(function (c) {
                                            return (
                                                '%' +
                                                (
                                                    '00' +
                                                    c.charCodeAt(0).toString(16)
                                                ).slice(-2)
                                            );
                                        })
                                        .join(''),
                                );

                                console.log(credentialResponse);
                                console.log(JSON.parse(jsonPayload));
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                        <ul className="navbar-nav ms-auto py-4 py-lg-0">
                            <li className="nav-item">
                                <a
                                    className="nav-link px-lg-3 py-3 py-lg-4"
                                    href="index.html"
                                >
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link px-lg-3 py-3 py-lg-4"
                                    href="about.html"
                                >
                                    About
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link px-lg-3 py-3 py-lg-4"
                                    href="post.html"
                                >
                                    Sample Post
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link px-lg-3 py-3 py-lg-4"
                                    href="contact.html"
                                >
                                    Contact
                                </a>
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
                <div className="row gx-4 gx-lg-5 justify-content-center">

                </div>
            </div>
            <div id="container"></div>
            <PaginatedItems itemsPerPage={1} items={blogs} />
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

function PaginatedItems({ itemsPerPage, items }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
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
                    <>
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
                        </div>
                        {/* Divider*/}
                        <hr className="my-4" />
                    </>
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
