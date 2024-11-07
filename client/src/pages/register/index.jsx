import React, { useState, useEffect, useContext } from "react";
// import "./index.css";
import { api } from "../../api/base.js";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext.jsx";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const Register = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    try {
      setIsLoading(true);
      const res = await api.post("auth/register", formValues);
      console.log("RESPONSE : ", res.data);
      localStorage.setItem("TOKEN", res.data.token);
      navigate("/");
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    api
      .get("auth/me")
      .then(({ data }) => {
        setUser(data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
      });
  }, []);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      errors.firstName = "First name is required!";
    }
    if (!values.lastName) {
      errors.lastName = "Last name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters!";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters!";
    }
    return errors;
  };

  return (
    <div className="background">
      <form
        className="form"
        onSubmit={handleSubmit}
        style={{ textAlign: "left" }}
      >
        <h1>Sign Up</h1>

        <div
          htmlFor="firstName"
          className="username"
          style={{ marginTop: "1rem" }}
        >
          First Name
        </div>
        <InputText
          className="input"
          type="text"
          id="firstName"
          name="firstName"
          value={formValues.firstName}
          onChange={handleChange}
          style={{ marginTop: "1rem" }}
        />
        {formErrors.firstName && (
          <p className="error">{formErrors.firstName}</p>
        )}

        <div style={{ marginTop: "1rem" }} className="username">
          Last Name
        </div>
        <InputText
          style={{ marginTop: "1rem" }}
          className="input"
          type="text"
          name="lastName"
          value={formValues.lastName}
          onChange={handleChange}
        />
        {formErrors.lastName && <p className="error">{formErrors.lastName}</p>}

        <div style={{ marginTop: "1rem" }} className="username">
          Email
        </div>
        <InputText
          style={{ marginTop: "1rem" }}
          className="input"
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
        {formErrors.email && <p className="error">{formErrors.email}</p>}

        <div style={{ marginTop: "1rem" }} className="password username">
          Password
        </div>
        <InputText
          style={{ marginTop: "1rem" }}
          className="input"
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
        />
        {formErrors.password && <p className="error">{formErrors.password}</p>}

        <Button
          disabled={isLoading}
          style={{ width: "100%", marginTop: "1rem" }}
          className="button"
          type="submit"
        >
          {isLoading ? (
            <ProgressSpinner
              style={{ height: "2rem", width: "2rem", color: "#66ff00" }}
              strokeWidth="8"
              // fill="#000000"
              color="#66ff00"
              animationDuration=".5s"
            />
          ) : (
            "Register"
          )}
        </Button>
        <div style={{ marginTop: "1rem" }}>
          <p style={{ textAlign: "center" }}>
            Already have an account? <Link to="/auth/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
