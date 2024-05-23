import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEye } from 'react-icons/fa';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { adddata, deldata, updatedata } from './context/ContextProvider';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Form = () => {
    const [getuserdata, setUserdata] = useState([]);
    const [hoveredButton, setHoveredButton] = useState({ id: null, type: null });
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 8;

    const { udata } = useContext(adddata);
    const { updata } = useContext(updatedata);
    const { dltdata, setDLTdata } = useContext(deldata);

    const getdata = async (page = 1, searchTerm = '') => {
        try {
            const res = await axios.get(`http://localhost:8001/api/users/getdata`, {
                params: {
                    page,
                    limit: itemsPerPage,
                    search: searchTerm,
                },
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = res.data;
            setUserdata(data.users || []);
            setTotalPages(data.totalPages || 1);
            console.log("Data retrieved successfully");
        } catch (error) {
            console.error("Error fetching data:", error.response || error.message);
        }
    };

    useEffect(() => {
        getdata(page, searchTerm);
    }, [page, searchTerm]);

    const deleteuser = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8001/api/users/deleteuser/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const deletedata = res.data;
            setDLTdata(deletedata);
            getdata(page, searchTerm);
            console.log("User deleted successfully");
        } catch (error) {
            console.error("Error deleting user:", error.response || error.message);
        }
    };

    const buttonStyle = (id, type) => ({
        transform: hoveredButton.id === id && hoveredButton.type === type ? 'translate3d(0, -.125rem, 0)' : 'translate3d(0, 0, 0)',
        transition: 'transform 0.3s',
    });

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const calculateRowIndex = (index) => (page - 1) * itemsPerPage + index + 1;

    return (
        < >
            {udata && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>{udata.name}</strong> added successfully!
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            {updata && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>{updata.name}</strong> updated successfully!
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            {dltdata && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>{dltdata.name}</strong> deleted successfully!
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}

            <div className="mt-5" >
                <div className="container">
                    <div className="add_btn mt-2 mb-2 d-flex justify-content-between">
                        <NavLink to="/register" className="btn btn-primary">Add data</NavLink>
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="form-control w-25"
                        />
                    </div>

                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">DOB</th>
                                <th scope="col">Email</th>
                                <th scope="col">Contact Number</th>
                                <th scope="col">Description</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getuserdata.map((element, id) => (
                                <tr key={id}>
                                    <th scope="row">{calculateRowIndex(id)}</th>
                                    <td>{element.name}</td>
                                    <td>{element.dob ? formatDate(element.dob) : 'N/A'}</td>
                                    <td>{element.email}</td>
                                    <td>{element.contact}</td>
                                    <td>{element.desc}</td>
                                    <td className="d-flex justify-content-between">
                                        <NavLink to={`view/${element._id}`}>
                                            <button
                                                className="btn btn-success"
                                                style={buttonStyle(element._id, 'view')}
                                                onMouseEnter={() => setHoveredButton({ id: element._id, type: 'view' })}
                                                onMouseLeave={() => setHoveredButton({ id: null, type: null })}
                                            >
                                                <FaEye size={20} />
                                            </button>
                                        </NavLink>
                                        <NavLink to={`edit/${element._id}`}>
                                            <button
                                                className="btn btn-primary"
                                                style={buttonStyle(element._id, 'edit')}
                                                onMouseEnter={() => setHoveredButton({ id: element._id, type: 'edit' })}
                                                onMouseLeave={() => setHoveredButton({ id: null, type: null })}
                                            >
                                                <MdEdit size={20} />
                                            </button>
                                        </NavLink>
                                        <button
                                            className="btn btn-danger"
                                            style={buttonStyle(element._id, 'delete')}
                                            onMouseEnter={() => setHoveredButton({ id: element._id, type: 'delete' })}
                                            onMouseLeave={() => setHoveredButton({ id: null, type: null })}
                                            onClick={() => deleteuser(element._id)}
                                        >
                                            <MdDeleteForever size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination
                        count={totalPages}
                        className='d-flex justify-content-center'
                        page={page}
                        onChange={(event, value) => setPage(value)}
                        renderItem={(item) => (
                            <PaginationItem
                                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                {...item}
                            />
                        )}
                    />
                </div>
            </div>
        </>
    );
};

export default Form;
