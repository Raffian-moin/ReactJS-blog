import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function CreateBlog() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
    ];

    const [value, setValue] = useState("");

    const onSubmit = (data) => {
      let blogs = []
      if (localStorage.getItem('blogs')) {
        const JsonBlogs = localStorage.getItem('blogs');
        blogs = JSON.parse(JsonBlogs);
        let last_elements_index = blogs.length
        blogs.push({
          id: last_elements_index,
          title: 'last',
          content: 'content'
        })
      } else {
        blogs = [
          {
            id: 1,
            title: 'sfs',
            content: 'sfsf'
          }
        ]
      }

      localStorage.setItem('blogs', JSON.stringify(blogs));
    };

    return (
      <>
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
            <div className="collapse navbar-collapse" id="navbarResponsive">
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
                  <a className="nav-link px-lg-3 py-3 py-lg-4" href="post.html">
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
          style={{ backgroundImage: 'url("assets/img/post-bg.jpg")' }}
        >
          <div className="container position-relative px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="col-md-10 col-lg-8 col-xl-7">
                <div className="post-heading">
                  <h1>
                    Man must explore, and this is exploration at its greatest
                  </h1>
                  <h2 className="subheading">
                    Problems look mighty small from 150 miles up
                  </h2>
                  <span className="meta">
                    Posted by
                    <a href="#!">Start Bootstrap</a>
                    on August 24, 2023
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                name="title"
                className="form-control"
                {...register("exampleRequired", { required: true })}
              />
              {errors.exampleRequired?.type === "required" && (
                <p>First name is required</p>
              )}
            </div>

            <div className="mb-3">
               <div className="mb-3">
                    <label className="form-label">Cover Image</label>
                    <input className="form-control" type="file" id="formFile"/>
                </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Content</label>
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                formats={formats}
              />
            </div>

            <div>
                <input type="submit" />
            </div>
          </form>
        </>
        {/* Footer*/}
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
