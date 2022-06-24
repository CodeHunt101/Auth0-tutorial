import { useRef } from "react";
import styles from "../../styles/Home.module.css";
import { webAuth } from "../../helpers/webAuth";

const SignUp = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const accountNumberInputRef = useRef();

  const handleForm = (event) => {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
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
  };

  return (
    <>
      <div className={styles.App}>
        <div className={styles["App-header"]}>
          <div>
            <h2>IOOF</h2>
          </div>

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
        </div>
      </div>
    </>
  );
};

export default SignUp;
