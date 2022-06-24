import styles from "../styles/Home.module.css";
import { WebAuth } from "auth0-js";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Cookies from "universal-cookie";

const cookie = new Cookies();

var webAuth = new WebAuth({
  domain: process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL,
  clientID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  redirectUri: "http://localhost:3000",
  scope: "openid profile email",
});

export default function Home() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const accountNumberInputRef = useRef();

  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignupForm, setIsSignupForm] = useState(false);

  const handleForm = (event) => {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (isSignupForm) {
      const accountNumber = accountNumberInputRef.current.value;

      webAuth.signup(
        {
          connection: "Username-Password-Authentication",
          email,
          password,
          userMetadata: { account_number: accountNumber.toString() },
        },
        (err) => {
          if (err) return alert("Something went wrong: " + err.message);
          console.log("success signup without login!");
          return alert("success signup without login!");
        }
      );

      emailInputRef.current.value = "";
      passwordInputRef.current.value = "";
      accountNumberInputRef.current.value = "";
    } else {
      webAuth.login(
        {
          responseType: "token",
          realm: "Username-Password-Authentication",
          email,
          password,
        },
        (err) => {
          if (err) {
            console.log(err);
            alert(err.description);
          }
        }
      );
    }
  };

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
      setIsAuthenticated(true);
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
    webAuth.logout({ returnTo: "http://localhost:3000" });
  };

  const toggleForms = () => setIsSignupForm(!isSignupForm);

  return (
    <>
      <div className={styles.App}>
        <div className={styles["App-header"]}>
          <>
            <div>
              <h2>IOOF</h2>
            </div>
            {!isAuthenticated && (
              <>
                <form className={styles.card} onSubmit={handleForm}>
                  <>
                    <div className={styles["card-section"]}>
                      <label htmlFor="email">Email</label>
                      <input
                        ref={emailInputRef}
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className={styles["card-section"]}>
                      <label htmlFor="password">Password</label>
                      <input
                        ref={passwordInputRef}
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                      />
                    </div>
                  </>
                  {!isAuthenticated && isSignupForm && (
                    <>
                      <div className={styles["card-section"]}>
                        <label htmlFor="account-number">Account number</label>
                        <input
                          ref={accountNumberInputRef}
                          type="number"
                          id="account-number"
                          placeholder="Enter your account number"
                        />
                      </div>
                    </>
                  )}
                  <button type="submit">Submit</button>
                </form>
                <div onClick={toggleForms}>
                  {!isAuthenticated && !isSignupForm ? "Log In" : "Sign Up"}{" "}
                  Form
                </div>
              </>
            )}
          </>

          {user && (
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
          )}
        </div>
      </div>
    </>
  );
}
