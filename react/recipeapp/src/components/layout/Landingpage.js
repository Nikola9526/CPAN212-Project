import React, { Component } from 'react'
import { Link } from 'react-router-dom';
class Landingpage extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">GoodFood Blog</h1>
                <p className="lead">
                  {" "}
                  Discover Tons of Recipes from everyone accross the globe or even add yours
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default  Landingpage;