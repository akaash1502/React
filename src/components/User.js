import { useState } from "react";

const User = ({name}) => {
    const [count,setCount] = useState(0);
    const [count2] = useState(1);
  return (
    <div className="user-card">
        <h1>Count : {count}</h1>
        {/* <h1>Count : {count2}</h1> */}
      <h2>Name: {name}</h2>
      <h3>Location: NIT Jalandhar</h3>
      <h4>Instagram: a__kaash1502</h4>
    </div>
  );
};

export default User;