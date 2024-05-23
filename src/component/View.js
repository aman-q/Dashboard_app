import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

const View = () => {
    const [userdata, setUserdata] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    const getdata = useCallback(async () => {
        try {
            const res = await fetch(`https://dashboard-backend-d72f.onrender.com/api/users/getuser/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error('Error fetching data');
            }

            const data = await res.json();
            setUserdata(data);
        } catch (error) {
            console.error(error);
        }
    }, [id]);

    useEffect(() => {
        getdata();
    }, [getdata]);

    const deleteuser = async (id) => {
        try {
            const res = await fetch(`https://dashboard-backend-d72f.onrender.com/deleteuser/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error('Error deleting user');
            }

            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
  };

    return (
        <div className='container mt-3'>
            <h1 style={{ fontWeight: 400 }} className='d-flex justify-content-center'>Welcome {userdata.name}</h1>

            <Card sx={{ minWidth: 400, maxWidth: 800, margin: 'auto', padding: 2 }}>
                <CardContent>
                    <div className='add-btn d-flex justify-content-end'>
                        <NavLink to={`/edit/${userdata._id}`}>
                            <button className="btn btn-primary me-2"> <MdEdit size={20} /> </button>
                        </NavLink>
                        <button className="btn btn-danger" onClick={() => deleteuser(userdata._id)}> <MdDeleteForever size={20} /> </button>
                    </div>
                    <div className='row'>
                        <div className='col-lg-6 col-md-6 col-12'>
                            <h5 className="mt-3">Name: <span style={{ fontWeight: 100 }}>{userdata.name}</span></h5>
                            <h5 className="mt-3">DOB: <span style={{ fontWeight: 100 }}>{userdata.dob ? formatDate(userdata.dob) : 'N/A'}</span></h5>
                            <p className="mt-3">Description: <span style={{ fontWeight: 100 }}>{userdata.desc}</span></p>
                        </div>

                        <div className='col-lg-6 col-md-6 col-12'>
                            <p className="mt-5"><PhoneAndroidIcon /> Mobile: <span style={{ fontWeight: 100 }}>+91 {userdata.contact}</span></p>
                            <p className="mt-3"><MailOutlineIcon /> Email: <span style={{ fontWeight: 100 }}>{userdata.email}</span></p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default View;
