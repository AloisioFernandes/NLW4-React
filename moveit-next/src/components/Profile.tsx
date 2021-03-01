import styles from '../styles/components/Profile.module.css'

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/AloisioFernandes.png" alt="Aloísio Fernandes"/>
      <div>
        <strong>Aloísio Fernandes</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/> {/*Busca primeiramente na pasta public*/}
          Level 1
        </p>
      </div>
    </div>
  )
}