import React, { useState } from 'react';
import Sidebar from './Sidebar';
import storage from './fbase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { async } from '@firebase/util';
import axios from 'axios';

function Addproduct() {

    const redirect = useNavigate();
    const [image, setImage] = useState('');

    const [formvalue, setFormvalue] = useState({
        productname: "",
        price: "",
        details: "",
        tImage: ""
    });

    const onchangeHandel = (e) => {
        setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
    }

    const addProduct = (e) => {
        e.preventDefault();

        if (formvalue.productname == "") {
            document.getElementById("nameerr").innerHTML = "Please insert Productname *"
        }
        else {
            document.getElementById("nameerr").innerHTML = " "
        }
        if (formvalue.price == "") {
            document.getElementById("priceerr").innerHTML = "Please insert Product Price *"
        }
        else {
            document.getElementById("priceerr").innerHTML = " "
        }
        if (formvalue.details == "") {
            document.getElementById("detailerr").innerHTML = "Please insert Product Details *"
        }
        else {
            document.getElementById("detailerr").innerHTML = " ";
            handleUpload();
        }
    }

    function handleUpload() {
        if (!image) {
            alert("Please choose a file first!")
            return;
        }

        const storageRef = ref(storage, `/files/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",null,
            (err) => console.log("INSIDE ERROR"+err.metadata.name),
            () => {
              // download url
           getDownloadURL(uploadTask.snapshot.ref)
                        .then((URL) => {
                          console.log(">>>>>>" + URL);
                          formvalue.tImage = URL;
                          setFormvalue({ ...formvalue });
                          console.log("my form value"+JSON.stringify(formvalue));
                          submitData()
                        });
            }
          
          );
    }

    const submitData = async () => {
        const res = await axios.post('https://dhruvadminpanel-default-rtdb.firebaseio.com/user.json',formvalue);
        if(res.status === 200){
            swal({
                title: "Success!",
                text: "Product add Success!",
                icon: "success",
              });
              setFormvalue({ ...formvalue, productname: "", price: "", details: "", image: "" });
              redirect('/products');
        }
      }
    return (
        <>
            <div className="container-fluid page-body-wrapper">
                <Sidebar />
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-md-6">
                                <label>Product Name</label>
                                <input type="text" className="form-control" value={formvalue.productname} onChange={onchangeHandel} name='productname' placeholder="Product name" aria-label="Product name" />
                                <p id='nameerr' style={{ color: "red" }}></p>
                            </div>
                            <div className="col-md-6">
                                <label>Price</label>
                                <input type="text" className="form-control" value={formvalue.price} onChange={onchangeHandel} placeholder="$Price" name='price' aria-label="Price" />
                                <p id='priceerr' style={{ color: "red" }}></p>
                            </div>
                            <div className="col-md-12 mt-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Product Detail</label>
                                <textarea className="form-control" name='details' value={formvalue.details} onChange={onchangeHandel} placeholder="Product Detail" id="exampleFormControlTextarea1" rows={5} />
                                <p id='detailerr' style={{ color: "red" }}></p>
                            </div>
                            <div className="col-md-12 mt-3">
                                <label>Product Image</label>
                                &nbsp;&nbsp;
                                <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
                                <p id='imgerr' style={{ color: "red" }}></p>
                            </div>
                            <div className="col-md-12 mt-5 text-center">
                                <button className='btn btn-primary' onClick={addProduct}>Add Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addproduct