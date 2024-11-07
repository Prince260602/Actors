import React, { useContext, useEffect, useState } from "react";
import { api } from "../../api/base";
import { AuthContext } from "../../context/Authcontext";
import { Navigate, useLocation } from "react-router-dom";
// import { useNavigate } from "react-router"

const AuthGuard = (props) => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setEror] = useState(null);
  // const nmavigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api
      .get("/auth/me")
      .then(({ data }) => {
        setUser(data);
        setEror(null);
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
        setEror(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const { children } = props;

  if (!user && loading)
    return (
      <div>
        <div className="flex items-center justify-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      </div>
    );

  if (error) {
    console.log("Error: ", error);
    return <Navigate to="/auth/login" />;
  }

  if (!user && !loading) return <Navigate to="/auth/login" />;

  return <div>{children}</div>;
};

export default AuthGuard;
