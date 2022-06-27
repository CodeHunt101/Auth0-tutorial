import { useRef, useState } from "react";
import styles from "../../styles/Home.module.css";
import { webAuth } from "../../helpers/webAuth";
import { Auth0Error } from "auth0-js";

const SignUp = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const accountNumberInputRef = useRef();
  const [message, setMessage] = useState<string>();

  const handleForm = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    let email = emailInputRef.current as HTMLInputElement;
    let password = passwordInputRef.current as HTMLInputElement;
    let accountNumber = accountNumberInputRef.current as HTMLInputElement;

    webAuth.signup(
      {
        connection: "Username-Password-Authentication",
        email: email.value,
        password: password.value,
        userMetadata: { account_number: accountNumber.value.toString() },
      },
      (err: Auth0Error) => {
        if (err) {
          console.log(err);
          setMessage("Something went wrong: " + err.description);
          return;
        }
        setMessage("success signup without login!");
        email.value = "";
        password.value = "";
        accountNumber.value = "";
      }
    );
  };

  return (
    <>
      <h2>IOOF (Sign up)</h2>
      {message && <h3>{message}</h3>}
      <form className={styles.card} onSubmit={handleForm}>
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
        <div className={styles["card-section"]}>
          <label htmlFor="account-number">Account number</label>
          <input
            ref={accountNumberInputRef}
            type="number"
            id="account-number"
            placeholder="Enter your account number"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignUp;
