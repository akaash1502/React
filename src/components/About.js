import User from "../components/User";
import UserClass from "./UserClass";
import React from "react";



const About = () => {
  return (
    <div className="about-us-page">
      <h1>About Us</h1>
      <h2>Apna khaana</h2>
      {/* <User name={"Akash Sharma-Fxn"}/> */}
      <UserClass name={"Akash Sharma-Class"} location={"NIT Jalandhar"} />
    </div>
  );
};

export default About;
