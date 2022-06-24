import { webAuth } from "../../helpers/webAuth";
import { useState } from "react";
import styles from "../../styles/Home.module.css";

const PasswordReset = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
  });

  const [disableSubmit, setDisableSubmit] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLoginInfoChange = (event) => {
    setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDisableSubmit(true);
    setErrorMsg("");

    webAuth.changePassword(
      {
        connection: "Username-Password-Authentication",
        email: loginInfo.email,
      },
      function (error, result) {
        if (error) {
          console.log(error);
          return;
        }
        console.log(result);
      }
    );
  };

  return (
    <>
      <h2>IOOF (Password Reset)</h2>
      <form onSubmit={handleSubmit} className={styles.card}>
        <div className={styles["card-section"]}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={loginInfo.email}
            onChange={(event) => handleLoginInfoChange(event)}
          />
        </div>
        <input type="submit" value="Submit" disabled={disableSubmit} />
        <p>{errorMsg}</p>
      </form>
    </>
  );
};

export default PasswordReset;
