import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { api } from "../../api/base.js";
import { AuthContext } from "../../context/Authcontext.jsx";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";

const Login = () => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState([initialValues]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // api integration
  const [myData, setMyData] = useState(null);
  const [isError, setIsError] = useState("");

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const getApiData = async () => {
    try {
      setIsLoading(true);
      const res = await api.post("auth/login", formValues);
      setIsLoading(false);
      setMyData(res.data);
      localStorage.setItem("TOKEN", res.data.token);
      setUser(res.data);
      navigate("/");
    } catch (error) {
      setIsError(error.message);
      setIsLoading(false);
    }
  };

  // end here

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    getApiData();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
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
    if (!values.email) {
      errors.email = "Email is required! ";
    } else if (!regex.test(values.email)) {
      errors.email = "this is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required! ";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div className="background">
      {/* api data */}
      {/* 
            {isError && <h2>{isError}</h2>}
            <ul>
                {myData.map((item) => (
                    <li key={item.id}>
                        <div>
                            <p>Email: {item.email}</p>
                            <p>Name: {item.name}</p>
                        </div>
                    </li>
                ))}
            </ul> */}
      {/* end */}
      <form onSubmit={handleSubmit}>
        <div className="form">
          <h1 style={{ marginTop: "1rem" }}>Login </h1>

          <div className="username" style={{ marginTop: "1rem" }}>
            Email
          </div>
          <InputText
            style={{ marginTop: "1rem" }}
            className="input"
            type="email"
            name="email"
            placeholder="email "
            value={formValues.email}
            onChange={handleChange}
          />
          {formErrors.email && <p className="error">{formErrors.email}</p>}

          <div className="password" style={{ marginTop: "1rem" }}>
            Password
          </div>
          <InputText
            style={{ marginTop: "1rem" }}
            className="pass"
            type="password"
            name="password"
            placeholder="password"
            value={formValues.password}
            onChange={handleChange}
          />
          {formErrors.password && (
            <p className="error">{formErrors.password}</p>
          )}

          <div className="checkbox">
            <input type="checkbox" />
            <span style={{ marginInlineStart: ".5rem" }}>Remember me</span>
          </div>

          <Button
            disabled={isLoading}
            style={{ width: "100%" }}
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
              "Login"
            )}
          </Button>

          <div style={{ marginTop: "1rem" }}>
            <p style={{textAlign: "center"}}>
              Don't have an account?{" "}
              <Link to="/auth/register">Register</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
