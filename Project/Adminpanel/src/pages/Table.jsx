import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function Table() {
  const redirect = useNavigate();

  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await axios.get(
      `https://dhruvadminpanel-default-rtdb.firebaseio.com/user.json`
    );
    console.log(res);
    if (res.status === 200) {
      setData(res.data);
    }
  };

  const deleteData = async (id) => {
    window.confirm("Are You Sure Want to Delete");
    const res = await axios.delete(
      `https://dhruvadminpanel-default-rtdb.firebaseio.com/user/${id}.json`
    );
    console.log(res);
    if (res.status === 200) {
      swal({
        title: "Success",
        text: "Delete Success",
        icon: "success",
        button: "Aww yiss!",
      });
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Edit and Update Product

  const [formvalue1, setformvalue1] = useState({
    productname: "",
    price: "",
    details: "",
  });

  const [userID, setuserID] = useState({});

  const editHandel = async (id) => {
    const res = await axios.get(
      `https://dhruvadminpanel-default-rtdb.firebaseio.com/user/${id}.json`
    );
    if (res.status === 200) {
      setformvalue1(res.data);
      setuserID(id);
      handleShow();
    }
  };

  const onchangeHandle = (e) => {
    setformvalue1({ ...formvalue1, [e.target.name]: e.target.value });
  };

  const updateHandle = async (e) => {
    const res = await axios.patch(
      `https://dhruvadminpanel-default-rtdb.firebaseio.com/user/${userID}.json`,
      formvalue1
    );
    if (res.status === 200) {
      setformvalue1({ name: "", email: "", password: "", number: "" });
      getData();
      swal({
        title: "Success",
        text: "Update Success",
        icon: "success",
        button: "Aww yiss!",
      });
      handleClose();
    }
  };
  return (
    <>
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Product Data</h4>
                    <div className="table-responsive pt-3">
                      <table className="table table-dark">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Product name</th>
                            <th>Price</th>
                            <th>Details</th>
                            <th>Product Image</th>
                            <th>Edit Product</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(data).map((item, i) => {
                            return (
                              <tr>
                                <td>{i + 1}</td>
                                <td>{data[item].productname}</td>
                                <td>{data[item].price}</td>
                                <td>{data[item].details}</td>
                                <td>
                                  {" "}
                                  <img src={data[item].tImage} />{" "}
                                </td>
                                <td>
                                  <button
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal"
                                    onClick={() => editHandel(item)}
                                  >
                                    Edit
                                  </button>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => deleteData(item)}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row g-0">
              <div className="col-lg-12">
                <div className="bg-primary h-100 p-5">
                  <form>
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="text-white">Product Name</label>
                        <input
                          type="text"
                          name="productname"
                          value={formvalue1.productname}
                          onChange={onchangeHandle}
                          className="form-control bg-light border-0 px-4"
                          placeholder="productname"
                          style={{ height: 55 }}
                        />
                      </div>
                      <div className="col-12 mt-3">
                        <label className="text-white">Product Price</label>
                        <input
                          type="text"
                          name="price"
                          value={formvalue1.price}
                          onChange={onchangeHandle}
                          className="form-control bg-light border-0 px-4"
                          placeholder="price"
                          style={{ height: 55 }}
                        />
                      </div>
                      <div className="col-12 mt-3">
                        <label className="text-white">Product Details</label>
                        <input
                          type="text"
                          name="details"
                          value={formvalue1.details}
                          onChange={onchangeHandle}
                          className="form-control bg-light border-0 px-4"
                          placeholder="details"
                          style={{ height: 55 }}
                        />
                      </div>
                      {/* <div className="col-12">
                                                <button  className="btn btn-secondary w-100 py-3" type="submit">Save</button>
                                            </div> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateHandle}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
}

export default Table;

