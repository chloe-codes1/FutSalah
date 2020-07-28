import React, { useState } from "react";
import UserContext from "../contexts/UserContext";

const UserProvider = ({ children }) => {
  const updateUser = () => {
    setUser((user) => {
      return {
        socialID: user.socialID,
        name: user.name,
        email: user.email,
        age: user.age,
        position: user.position,
        height: user.height,
        weight: user.weight,
        profileURL: user.profileURL,
      };
    });
  };

  // 초기값 테스트
  const initialState = {
    socialID: "",
    name: "김싸피",
    email: "abc@ssafy.com",
    age: "2000",
    position: "ALL",
    height: 200,
    weight: 100,
    profileURL: "",
    updateUser,
  };

  //Hook을 통한 state, setState를 정의합니다.
  const [user, setUser] = useState(initialState);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
