import { useState, useEffect } from "react";
import { webAuth } from "../../helpers/webAuth";
import Cookies from "universal-cookie";
const cookie = new Cookies();

const LoggedIn = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.replace("#", ""));
    const errorHash = new URLSearchParams(window.location.hash.split("&")[1]);
    const errorMessage = errorHash.get("error_description");

    if (errorMessage) {
      console.log(errorMessage);
      return alert(errorMessage);
    }

    const accessToken = hash.get("access_token") || cookie.get("access_token");
    console.log("access_token", accessToken);

    if (accessToken) {
      webAuth.client.userInfo(accessToken, (err, user) => {
        if (err) {
          console.log(err);
          return alert(err.description);
        }
        setUser(user);
        console.log(user);
        cookie.set("access_token", accessToken);
      });
    }
  }, []);

  const handleLogout = () => {
    cookie.remove("access_token");
    webAuth.logout({ returnTo: "http://localhost:3000/auth0js/login" });
  };

  return (
    user && (
      <>
        <h1>User Info</h1>
        <img src={user.picture} />
        <ul>
          <li>Email: {user.email}</li>
          <li>First Name: {user.given_name}</li>
          <li>Surname: {user.family_name}</li>
        </ul>
        <button onClick={handleLogout}>Log Out</button>
      </>
    )
  );
};

export default LoggedIn;
