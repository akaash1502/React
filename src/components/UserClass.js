import React from "react";
import UserContext from "../../utils/UserContext";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: 'Dummy',
        location: 'Default', 
      },
    }
    
  }
  async componentDidMount() {
    // console.log("User Class Did Mount");
    const data = await fetch("https://api.github.com/users/akaash1502");
    const json = await data.json();
    console.log(json);

    this.setState({
      userInfo:json,
    })

  }

  render() {
    //De structuring props
    // const { name, location } = this.props;
    const {login,avatar_url} = this.state.userInfo;

    return (
      <div className="user-card">
        <h2>Name: {login}</h2>
        <img className="user-pic" src={avatar_url}/>
        {/* <h3>Location: {location}</h3> */}
        <h4>Instagram: a__kaash1502</h4>
        <div>
          <UserContext.Consumer>
            {({loggedInUser})=> <h2>{loggedInUser}</h2>}
          </UserContext.Consumer>
        </div>        
      </div>
    );
  }
}

export default UserClass;
