import styles from './HomePage.module.css'

const HomePage = () => {
  return (
    <div className={styles.homePage}>
        <h1 className={styles.title}>Home Page</h1>
        <p className={styles.welcomeText}>Welcome to the Home Page</p>
        <img className={styles.image} src="https://images.unsplash.com/photo-1572177812156-58036aae439c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="home page" />
    </div>
  )
}

export default HomePage
