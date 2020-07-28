import { createContext } from "react";

const UserContext = createContext({
  socialID: "",
  name: "",
  logged: false,
  // profileURL: "",
});

export default UserContext;
