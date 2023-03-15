import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function Signup() {
  const redirect = useNavigate();

  const [formvalue, setFormvalue] = useState({
    username: "",
    email: "",
    password: "",
    returnSecureToken: true,
  });

  const onchangeHandle = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };

  var nametest = /^[a-zA-Z ]{2,30}$/;
  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onsubmitHandle = async (e) => {
    e.preventDefault();

    if (formvalue.username == "") {
      document.getElementById("nameerr").innerHTML = "Please insert Username *";
    } else if (!nametest.test(formvalue.username)) {
      document.getElementById("nameerr").innerHTML =
        "Please enter valid Username *";
    } else {
      document.getElementById("nameerr").innerHTML = " ";
    }
    if (formvalue.email == "") {
      document.getElementById("emailerr").innerHTML = "Please insert email *";
    } else if (!emailPattern.test(formvalue.email)) {
      document.getElementById("emailerr").innerHTML =
        "Please insert valid email *";
    } else {
      document.getElementById("emailerr").innerHTML = " ";
    }
    if (formvalue.password == "") {
      document.getElementById("passerr").innerHTML = "Please insert password *";
    } else if (formvalue.password.length < 8) {
      document.getElementById("passerr").innerHTML =
        "Please enter 8 digit password *";
    } else {
      document.getElementById("passerr").innerHTML = " ";
    }
    let checkcheck = document.getElementById("chekthisbox");
    if (!checkcheck.checked) {
      document.getElementById("checkk").innerHTML = "Checkbox not selected: ";
    } else {
      document.getElementById("checkk").innerHTML = "";
      const res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD00Zh3z-wfAQf4batkT69zGsEUFWp7Z2M",
        formvalue
      );
      if (res.status === 200) {
        setFormvalue({ username: "", email: "", password: "" });
        checkcheck.checked = false;
        swal({
          title: "Success",
          text: "Registration Success",
          icon: "success",
          button: "Aww yiss!",
        });
        redirect("/index");
      }
    }
    // if (formvalue.username !== "" && formvalue.email !== "" && formvalue.password !== "" && checkcheck.checked) {

    // }
  };

  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                  <div className="brand-logo">
                    <img src="../../images/logo.svg" alt="logo" />
                  </div>
                  <h4>New here?</h4>
                  <h6 className="font-weight-light">
                    Signing up is easy. It only takes a few steps
                  </h6>
                  <form className="pt-3">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="username"
                        id="exampleInputUsername1"
                        placeholder="Username"
                        onChange={onchangeHandle}
                        value={formvalue.username}
                        autoComplete="off"
                      />
                      <p id="nameerr" style={{ color: "red" }}></p>
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        name="email"
                        id="exampleInputEmail1"
                        placeholder="Email"
                        onChange={onchangeHandle}
                        value={formvalue.email}
                        autoComplete="off"
                      />
                      <p id="emailerr" style={{ color: "red" }}></p>
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        name="password"
                        value={formvalue.password}
                        onChange={onchangeHandle}
                        id="exampleInputPassword1"
                        placeholder="Password"
                        autoComplete="off"
                      />
                      <p id="passerr" style={{ color: "red" }}></p>
                    </div>
                    <div className="mb-4">
                      <div className="form-check">
                        <label className="form-check-label text-muted">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="chekthisbox"
                          />
                          I agree to all Terms &amp; Conditions
                        </label>
                        <p id="checkk" style={{ color: "red" }}></p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <button
                        className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                        onClick={onsubmitHandle}
                      >
                        SIGN UP
                      </button>
                    </div>
                    <div className="text-center mt-4 font-weight-light">
                      Already have an account?{" "}
                      <NavLink to="/index" className="text-primary">
                        Login
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
    </>
  );
}

export default Signup;
