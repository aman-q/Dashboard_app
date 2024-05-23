import React, { useContext, useEffect, useState, useCallback } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import { updatedata } from './context/ContextProvider';

const Edit = () => {
    const [inputvalue, setValue] = useState({
        name: '',
        dob: '',
        contact: '',
        email: '',
        desc: ''
    });
    const { setUPdata } = useContext(updatedata);
    const navigate = useNavigate();
    const { id } = useParams();

    const inputchange = (e) => {
        const { name, value } = e.target;
        setValue((preval) => ({
            ...preval,
            [name]: value
        }));
    };

    const getdata = useCallback(async () => {
        try {
            const res = await fetch(`https://dashboard-backend-d72f.onrender.com/api/user/getuser/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();

            if (res.status === 422 || !data) {
                console.log('error ');
            } else {
                // Convert the date to the correct format
                if (data.dob) {
                    data.dob = new Date(data.dob).toISOString().split('T')[0];
                }
                setValue(data);
                console.log('get data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [id]);

    useEffect(() => {
        getdata();
    }, [getdata]);

    const updateuser = async (e) => {
        e.preventDefault();
        const { name, dob, contact, email, desc } = inputvalue;

        try {
            const res = await fetch(`https://dashboard-backend-d72f.onrender.com/api/users/updateuser/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name, dob, contact, email, desc
                })
            });

            const data2 = await res.json();

            if (res.status === 422 || !data2) {
                alert('Please fill out all fields correctly.');
            } else {
                navigate('/');
                setUPdata(data2);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className='container'>
            <NavLink to='/'><IoMdArrowBack />back</NavLink>

            <form className="mt-4" onSubmit={updateuser}>
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" name="name" value={inputvalue.name} onChange={inputchange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">DOB</label>
                        <input type="date" name="dob" value={inputvalue.dob} onChange={inputchange} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Contact Number</label>
                        <input type="number" name="contact" value={inputvalue.contact} onChange={inputchange} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                        <input type="email" name="email" value={inputvalue.email} onChange={inputchange} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-12 col-md-12 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <textarea name="desc" value={inputvalue.desc} onChange={inputchange} className="form-control" id="" cols="30" rows="5"></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Edit;
