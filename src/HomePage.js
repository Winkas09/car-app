import styles from './HomePage.module.css'

const HomePage = () => {
  return (
    <div className={styles.homePage}>
        <h1 className={styles.title}>Home Page</h1>
        <p className={styles.welcomeText}>Welcome to the Home Page</p>
    </div>
  )
}

export default HomePage
