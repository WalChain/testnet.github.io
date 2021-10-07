import styles from './Miw.module.scss';

const Miw = () => {
  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <div className={styles.textContainer}>
          <div className={styles.title}>Walchain</div>
          <div className={styles.MIW}>#MIW</div>
          <div className={styles.paragraph}>
            La blockchain En Wallonie. <br />
            L’initiative WalChain, née du rassemblement de startups blockchain
            wallonnes, vise à promouvoir la blockchain « Made In Wallonia »
            comme outil novateur pour la construction d’écosystèmes
            collaboratifs et transparents mais aussi comme une opportunité de
            contribuer au redéploiement économique durable en Wallonie.
          </div>
          <div className={styles.button}>START FREE NOW</div>
        </div>
      </div>
      <div className={styles.background}></div>
    </div>
  );
};

export default Miw;
