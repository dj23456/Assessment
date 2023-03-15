import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweet-alert";

const Login = () => {
  const redirect = useNavigate();

  const [formvalue, setFormvalue] = useState({
    email: "",
    password: "",
    returnSecureToken: true,
  });

  const onchangeHandel = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };

  const onsubmitHandel = async (e) => {
    e.preventDefault();
    const res = await axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD00Zh3z-wfAQf4batkT69zGsEUFWp7Z2M",
        formvalue
      )
      .then((response) => {
        if (response.status === 200) {
          // store data in local store
          localStorage.setItem("auth_id", response.data.localId);
          localStorage.setItem("email", response.data.email);

          swal({
            title: "Success",
            text: "Login Success",
            icon: "success",
            button: "Aww yiss!",
          });
          setFormvalue({ email: "", password: "" });
          redirect("/index");
        }
      })
      .catch((error) => {
        // Error
        if (error.response) {
          swal({
            title: "No",
            text: "Login Failed",
            icon: "error",
            button: "Aww No!",
          });
          redirect("/index");
        }
      });
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src="../../images/logo.svg" alt="logo" />
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Log in to continue.</h6>
                <form className="pt-3">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      value={formvalue.email}
                      onChange={onchangeHandel}
                      placeholder="Username"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      value={formvalue.password}
                      onChange={onchangeHandel}
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={onsubmitHandel}
                    >
                      LOG IN
                    </button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input
                          type="checkbox"
                          id="Validate"
                          className="form-check-input"
                        />
                        Keep me signed in
                      </label>
                      <span id="checkerr" style={{ color: "red" }}></span>
                    </div>
                    <a href="#" className="auth-link text-black">
                      Forgot password?
                    </a>
                  </div>

                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account?{" "}
                    <NavLink to="/register" className="text-primary">
                      Create
                    </NavLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* content-wrapper ends */}
      </div>
      {/* page-body-wrapper ends */}
    </div>
  );
};

export default Login;
