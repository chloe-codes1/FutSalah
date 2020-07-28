import { createContext } from "react";

const UserContext = createContext({
  socialID: "",
  name: "",
  email: "",
  age: "1970",
  position: "",
  height: 0,
  weight: 0,
  profileURL: "",
  updateUser: () => {},
});

export default UserContext;
