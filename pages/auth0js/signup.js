import { useRef } from 'react'
import styles from '../../styles/Home.module.css'
import { webAuth } from '../../helpers/webAuth'

const SignUp = () => {
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const accountNumberInputRef = useRef()

  const handleForm = (event) => {
    event.preventDefault()

    const email = emailInputRef.current.value
    const password = passwordInputRef.current.value
    const accountNumber = accountNumberInputRef.current.value

    webAuth.signup(
      {
        connection: 'Username-Password-Authentication',
        email,
        password,
        userMetadata: { account_number: accountNumber.toString() },
      },
      (err) => {
        if (err) return alert('Something went wrong: ' + err.message)
        console.log('success signup without login!')
        return alert('success signup without login!')
      }
    )

    emailInputRef.current.value = ''
    passwordInputRef.current.value = ''
    accountNumberInputRef.current.value = ''
  }

  return (
    <>
      <h2>IOOF (Sign up)</h2>
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
        <div className={styles['card-section']}>
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
  )
}

export default SignUp
