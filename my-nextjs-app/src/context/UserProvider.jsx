"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from "cookies-next";

const UserContext = createContext([]);

const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    const sessionDetails = getCookie("sessionDetails");
    console.log("Session details", sessionDetails)
    if (sessionDetails) {
      let sessionDecoded = JSON.parse(atob(decodeURIComponent(sessionDetails)));
      console.log(sessionDecoded, " \ncook1");
      setUserDetails(sessionDecoded);
    }
  }, []);
  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export { UserContext };
