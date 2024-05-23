import React, { useState } from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [inputvalue, setValue] = useState({
        name: '',
        dob: '',
        contact: '',
        email: '',
        desc: ''
    });

    const navigate = useNavigate();

    const inputchange = (e) => {
        const { name, value } = e.target;
        setValue((preval) => ({
            ...preval,
            [name]: value
        }));
    };

    const addinputdata = async (e) => {
        e.preventDefault();
        
        const { name, dob, contact, email, desc } = inputvalue;

        console.log("Submitting form with data:", { name, dob, contact, email, desc });

        try {
            const res = await axios.post("http://localhost:8001/api/users/register", { name, dob, contact, email, desc }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = res.data;
            console.log("Response from server:", data);

            if (res.status === 422 || !data) {
                console.log("Error in response");
                alert("Error in response");
            } else {
                navigate("/");
                console.log("Data added successfully");
            }
        } catch (error) {
            console.error("Error occurred:", error.response || error.message);
            alert("Error occurred: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className='container'>
            <NavLink to='/'><IoMdArrowBack />back</NavLink>

            <form className="mt-4" onSubmit={addinputdata}>
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name="name" value={inputvalue.name} onChange={inputchange} className="form-control" id="name" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="dob" className="form-label">DOB</label>
                        <input type="date" value={inputvalue.dob} onChange={inputchange} name="dob" className="form-control" id="dob" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="contact" className="form-label">Contact Number</label>
                        <input type="number" value={inputvalue.contact} onChange={inputchange} name="contact" className="form-control" id="contact" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" value={inputvalue.email} onChange={inputchange} name="email" className="form-control" id="email" />
                    </div>
                    <div className="mb-3 col-lg-12 col-md-12 col-12">
                        <label htmlFor="desc" className="form-label">Description</label>
                        <textarea name="desc" value={inputvalue.desc} onChange={inputchange} className="form-control" id="desc" cols="30" rows="5"></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
