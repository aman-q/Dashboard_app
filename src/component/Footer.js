import React from 'react';
import { MdDashboardCustomize } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary " >
      <div className="container py-4">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <div className="d-flex align-items-center">
            <p className="navbar-brand font-weight: 800 text-uppercase " ><MdDashboardCustomize size={30}/>DashBoard Application</p>
            </div>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-4 mb-4 mb-md-0">
                <h2 className="mb-3 ">Resources</h2>
                <ul className="list-unstyled">
                  <li className="mb-2"><p  className="text-decoration-none">Flowbite</p></li>
                  <li><p className="text-decoration-none">Tailwind CSS</p></li>
                </ul>
              </div>
              <div className="col-md-4 mb-4 mb-md-0">
                <h2 className="mb-3 ">Follow us</h2>
                <ul className="list-unstyled">
                  <li className="mb-2"><p className="text-decoration-none">Github</p></li>
                  <li><p  className="text-decoration-none">Discord</p></li>
                </ul>
              </div>
              <div className="col-md-4">
                <h2 className="mb-3 ">Legal</h2>
                <ul className="list-unstyled">
                  <li className="mb-2"><p  className="text-decoration-none">Privacy Policy</p></li>
                  <li><p  className="text-decoration-none">Terms &amp; Conditions</p></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-auto text-sm text-muted">© 2024 <Link href="#" className="text-decoration-none">DashBoard Application™</Link>. All Rights Reserved.</div>
          <div className="col-auto">
            <p className="text-dark me-3"><i className="bi bi-facebook"></i></p>
            <p className="text-dark me-3"><i className="bi bi-discord"></i></p>
            <p className="text-dark me-3"><i className="bi bi-twitter"></i></p>
            <p className="text-dark me-3"><i className="bi bi-github"></i></p>
            <p className="text-dark"><i className="bi bi-dribbble"></i></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
