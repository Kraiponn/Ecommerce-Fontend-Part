import React from 'react';
import { Link } from 'react-router-dom';

import Layout from '../../components/Layout/Layout';

import useAuth from '../../store/hooks/auth';

const DashBoard = () => {
  const { profile } = useAuth();

  /**
   * User Link
   */
  const useLinks = () => {
    return(
      <div className="card">
        <h3 className="card-header">User Links</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">My Cart</Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/profile/update">
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  /**
   * User Info
   */
  const userInfo = () => {
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

  /**
   * Purchase History
   */
  const purchaseHistory = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        <ul className="list-group">
          <li className="list-group-item">history</li>
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
        <div className="col-3">{useLinks()}</div>
        <div className="col-9">
          {userInfo()}
          {purchaseHistory()}
        </div>
      </div>
    </Layout>
  )
}

export default DashBoard;