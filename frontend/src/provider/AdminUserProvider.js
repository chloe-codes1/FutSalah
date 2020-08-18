import React, { useEffect, useReducer } from "react";

import AdminUserContext from "../contexts/AdminUserContext";

const adminInitialState = {
  adminID: "",
  name: "",
  stadiumID: "",
  logged: false,
};

const adminreducer = (state, action) => {
  switch (action.type) {
    case "ADMIN_LOGIN_USER":
      console.log("ADMIN LOGGED!");

      return {
        ...state,
        adminID: action.adminID,
        name: action.name,
        stadiumID: action.stadiumID,
        logged: true,
      };
    case "ADMIN_LOGOUT_USER":
      console.log("ADMIN LOGOUT!");
      window.sessionStorage.removeItem("adminID");
      window.sessionStorage.removeItem("name");
      window.sessionStorage.removeItem("stadiumID");
      window.location.href = "/";
      return {
        ...adminInitialState,
      };
    default:
      return state;
  }
};

const AdminUserProvider = ({ children }) => {
  const [adminuserinfo, adminUserDispatch] = useReducer(
    adminreducer,
    adminInitialState
  );

  useEffect(() => {
    const adminID = window.sessionStorage.getItem("adminID");
    if (adminID) {
      const name = window.sessionStorage.getItem("name");
      const stadiumID = window.sessionStorage.getItem("stadiumID");

      adminUserDispatch({
        type: "ADMIN_LOGIN_USER",
        adminID,
        name,
        stadiumID,
      });
    }
  }, []);

  return (
    <AdminUserContext.Provider value={{ adminuserinfo, adminUserDispatch }}>
      {children}
    </AdminUserContext.Provider>
  );
};

export default AdminUserProvider;
