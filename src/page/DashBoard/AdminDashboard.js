import React from 'react';
import { Link } from 'react-router-dom';

import Layout from '../../components/Layout/Layout';

import useAuth from '../../store/hooks/auth';

const AdminDashBoard = () => {
  const { profile } = useAuth();

  /**
   * User Link
   */
  const adminLinks = () => {
    return(
      <div className="card">
        <h3 className="card-header">Admin Links</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <Link 
              className="nav-link" 
              to="/create/category"
            >
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link 
              className="nav-link" 
              to="/create/product"
            >
              Create Product
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  /**
   * User Info
   */
  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{profile.name}</li>
          <li className="list-group-item">{profile.email}</li>
          <li className="list-group-item">{profile.role === 1 ? 'Admin' : 'Registered User'}</li>
        </ul>
      </div>
    );
  }


  return(
    <Layout
      title="Dashboard"
      description={`G'day ${profile.name}!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </Layout>
  )
}

export default AdminDashBoard;