import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/actions';
import swal from 'sweetalert';

const AddUser = () => {
    const redirect = useNavigate();
    let dispatch = useDispatch();

    const [state, setState] = useState({
        name: "",
        email: "",
        contact: "",
        address: ""
    });

    const [error, setError] = useState("")
    const { name, email, contact, address } = state;

    const handleInputChange = (e) => {
        let {name, value} = e.target;
        setState({...state, [name] : value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !email || !contact || !address){
            setError("Please input all input Field");
        } else{
            swal({
                title: "User Add successfully",
                icon: "success",
              });
            dispatch(addUser(state));
            redirect("/index");
            setError("");
        }
    }
    return (
        <div className='container'>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '45ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <div className='text-center'>
                    <Button style={{ width: "100px" }}
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={() => redirect("/index")}>Go Back</Button>
                </div>
                <h2 >Add User</h2>
               { error && <h3 style={{color : "red"}}>{error}</h3>}
                <TextField id="standard-basic" onChange={handleInputChange} label="Enter Your Name" variant="standard" value={name} type="text" name='name' />
                <br />
                <TextField id="standard-basic" onChange={handleInputChange} label="Email" variant="standard" value={email} type="email" name='email' />
                <br />
                <TextField id="standard-basic" onChange={handleInputChange} label="Number" variant="standard" value={contact} type="number" name='contact' />
                <br />
                <TextField id="standard-basic" onChange={handleInputChange} label="Address" variant="standard" value={address} type="text" name='address' />
                <br />
                <div className='text-center'>
                    <Button style={{ width: "100px" }} variant="contained" color="primary" type="submit">Submit</Button>
                </div>
            </Box>
        </div>
    )
}

export default AddUser