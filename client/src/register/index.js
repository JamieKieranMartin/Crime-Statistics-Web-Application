import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import config from "../config.json";

export function Register(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confpassword: ""
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
    confpassword: ""
  });
  const [success, setSuccess] = useState(false);

  const clearError = e => {
    setFormError(oldData => ({
      ...oldData,
      [e.target.name]: ""
    }));
  };

  const handleInput = e => {
    e.persist();

    setFormData(oldFormData => ({
      ...oldFormData,
      [e.target.name]: e.target.value
    }));

    if (e.target.value.length === 0) {
      setFormError(oldData => ({
        ...oldData,
        [e.target.name]: "This is required"
      }));
    } else if (e.target.name === "confpassword") {
      if (e.target.value !== formData.password) {
        setFormError(oldData => ({
          ...oldData,
          [e.target.name]: "Passwords must equal"
        }));
      } else {
        clearError(e);
      }
    } else {
      clearError(e);
    }
  };

  const validatePassword = () => {
    return formData.password.length > 0;
  };
  const validateEmail = () => {
    return formData.email.length > 0;
  };

  const validatePasswordEqual = () => {
    return formData.confpassword === formData.password;
  };

  const handleSuccess = () => {
    if (success) {
      return <Redirect to="/login" />;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (validatePassword() && validateEmail() && validatePasswordEqual()) {
      fetch(`${config.server}/register`, {
        method: "POST",
        body: `email=${formData.email}&password=${formData.password}`,
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        }
      })
        .then(function(response) {
          if (response.ok) {
            return response.json();
          }
        })
        .then(function(result) {
          alert(`Success: ${result.message}`);
          setSuccess(true);
        })
        .catch(function(error) {
          alert(`Error: ${error.message}`);
        });
    }
  };

  return (
    <div class="d-flex justify-content-center">
      <div className="card">
        <form onSubmit={handleSubmit} className="card-body">
          <h1 className="py-3">Register</h1>
          <div className="form-group">
            <label className="control-label">Email address</label>
            <input
              value={formData.email}
              onChange={handleInput}
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
            />
            {formError.email != null ? (
              <small className="form-text text-muted">{formError.email}</small>
            ) : null}
          </div>
          <div className="form-group">
            <label className="control-label">Password</label>
            <input
              value={formData.password}
              onChange={handleInput}
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
            />
            {formError.password != null ? (
              <small className="form-text text-muted">
                {formError.password}
              </small>
            ) : null}
          </div>
          <div className="form-group">
            <label className="control-label">Confirm Password</label>
            <input
              value={formData.confpassword}
              onChange={e => {
                handleInput(e);
                validatePasswordEqual(e);
              }}
              type="password"
              name="confpassword"
              className="form-control"
              placeholder="Confirm Password"
            />
            {formError.confpassword != null ? (
              <small className="form-text text-muted">
                {formError.confpassword}
              </small>
            ) : null}
          </div>
          {handleSuccess()}
          <div className="form-group py-3">
            <button type="submit" className="btn btn-outline-dark">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
