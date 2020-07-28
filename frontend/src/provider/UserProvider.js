import React, { useState } from "react";
import UserContext from "../contexts/UserContext";

const UserProvider = ({ children }) => {
  // 초기값 테스트
  const initialState = {
    socialID: "",
    name: "김싸피",
    logged: false,
  };

  //Hook을 통한 state, setState를 정의합니다.
  const [user] = useState(initialState);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
