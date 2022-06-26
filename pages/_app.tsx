import React from 'react'
import { AppProps } from 'next/app'
import styles from '../styles/Home.module.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.App}>
      <div className={styles['App-header']}>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
