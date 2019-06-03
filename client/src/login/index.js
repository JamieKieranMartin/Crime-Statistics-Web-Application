import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import config from "../config.json";

export function Login(props) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState({ email: "", password: "" });
  const [success, setSuccess] = useState(false);
  const handleInput = e => {
    e.persist();
    setFormData(oldFormData => ({
      ...oldFormData,
      [e.target.name]: e.target.value
    }));
    if (e.target.value.length > 0) {
      setFormError(oldFormData => ({
        ...oldFormData,
        [e.target.name]: ""
      }));
    } else {
      setFormError(oldFormData => ({
        ...oldFormData,
        [e.target.name]: "This is required"
      }));
    }
  };

  const validatePassword = () => {
    return formData.password.length > 0;
  };
  const validateEmail = () => {
    return formData.email.length > 0;
  };

  const handleSuccess = () => {
    if (success) {
      return <Redirect to="/offences" />;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    validateEmail();
    validatePassword();
    if (validateEmail() && validatePassword()) {
      fetch(`${config.server}/login`, {
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
          props.setTokenJWT(result.token);
          alert("Success!");
          console.log(result.token);
          setSuccess(true);
        })
        .catch(function(error) {
          alert(`Error: ${error.message}`);
        });
    } else {
      alert("Please ensure all required fields are entered");
    }
  };

  return (
    <div class="d-flex justify-content-center">
      <div className="card">
        <form onSubmit={handleSubmit} className="card-body">
          <h1 className="py-3">Login</h1>
          <div className="form-group">
            <label className="control-label">Email</label>
            <input
              value={formData.email}
              onChange={handleInput}
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
            />
            {formError.email !== "" ? (
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
            {formError.password !== "" ? (
              <small className="form-text text-muted">
                {formError.password}
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
