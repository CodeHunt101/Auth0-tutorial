import styles from '../../styles/Home.module.css'
import { useRef } from 'react'
import { webAuth } from '../../helpers/webAuth'

const LoginAuth0Js = () => {
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const handleForm = (event: { preventDefault: () => void }) => {
    event.preventDefault()

    let email = (emailInputRef.current as HTMLInputElement)
    let password = (passwordInputRef.current as HTMLInputElement)

    webAuth.login(
      {
        responseType: 'token',
        realm: 'Username-Password-Authentication',
        email: email.value,
        password: password.value,
      },
      (err) => {
        if (err) {
          console.log(err)
          alert(err.description)
        }
      }
    )
  }

  return (
    <>
      <h2>IOOF (Log in)</h2>
      <form className={styles.card} onSubmit={handleForm}>
        <div className={styles['card-section']}>
          <label htmlFor="email">Email</label>
          <input
            ref={emailInputRef}
            type="email"
            id="email"
            placeholder="Enter your email"
          />
        </div>
        <div className={styles['card-section']}>
          <label htmlFor="password">Password</label>
          <input
            ref={passwordInputRef}
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default LoginAuth0Js
