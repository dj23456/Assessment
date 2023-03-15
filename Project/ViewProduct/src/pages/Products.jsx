import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicke from "./DatePicker";

function Products() {
  const redirect = useNavigate();
  const [data, setData] = useState([]);

  const getdata = async (e) => {
    const res = await axios.get(
      `https://dhruvadminpanel-default-rtdb.firebaseio.com//user.json`
    );
    if (res.status === 200) {
      setData(res.data);
    }
    // console.log(res);
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <div>
        <div className="blue_bg">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="titlepage">
                  <h2>Featured Products</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* project section */}
        <div id="project" className="project">
          <div className="container">
            <div className="row">
              {Object.keys(data).map((item, i) => {
                return (
                  <div className="col-md-4 mt-4">
                    <div className="card" style={{ width: "18rem" }}>
                      <img
                        src={data[item].tImage}
                        style={{ height: "200px" }}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">{data[item].productname}</h5>
                        <p className="card-text">${data[item].price}</p>
                        <button
                          className="btn btn-secondary"
                          onClick={() => redirect(`/viewdetails/${item}`)}
                        >
                          View Product
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="col-md-12">
                <a className="read_more" href="#">
                  See More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
