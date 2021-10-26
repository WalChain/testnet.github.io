import styles from './Miw.module.scss';

const Miw = () => {
  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <div className={styles.textContainer}>
          <div className={styles.title}>Walchain</div>
          <div className={styles.MIW}>#MIW</div>
          <div className={styles.paragraph}>
            The Blockchain in Wallonie <br />
            The WalChain initiative, born from the gathering of Walloon blockchain startups. The purpose is to promote &quot;Made in Wallonia&quot;
            blockchain as the innovative tool for building collaborative and transparent ecosystems but is also an opportunity to contrinute to a
            sustainable economic redeployment in Wallonia
          </div>
          <a href='https://walchain.be/' className={styles.button} rel='noreferrer' target='_blank'>
            EN SAVOIR PLUS
          </a>
        </div>
      </div>
      <div className={styles.background}></div>
    </div>
  );
};

export default Miw;
