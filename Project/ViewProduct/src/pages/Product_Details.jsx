import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Product_Details() {
  const [data, setData] = useState({});
  const { id } = useParams();

  const getData = async () => {
    // console.log(id);
    const res = await axios.get(
      `https://dhruvadminpanel-default-rtdb.firebaseio.com/user/${id}.json`
    );
    // console.log(res);
    if (res.status === 200) {
      setData(res.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="blue_bg">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2>Product Detail</h2>
              </div>
            </div>
            <div className="col-md-4 mt-4">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={data.tImage}
                  style={{ height: "200px" }}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{data.productname}</h5>
                  <p className="card-text">${data.price}</p>
                  <a href="#" className="btn btn-primary">
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product_Details;
