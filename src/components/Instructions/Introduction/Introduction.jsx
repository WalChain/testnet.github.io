import styles from './Introduction.module.scss';
import polka from '../../../assets/Instructions/polkadotjs.png';

const Introduction = ({ scroll }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>Guide to Polkadot-JS</div>
        <div className={styles.icon}>
          <img src={polka} alt='polka' />
        </div>
        <div className={styles.text}>
          <p>
            Guide étape par étape qui te permettra d&apos;utiliser
            l&apos;application walchain
          </p>
          <p>
            Ce guide t&apos;aidera à installer polkadot-js et à communiquer avec
            le site
          </p>
        </div>
        <div className={styles.button} onClick={() => scroll()}>
          Get Started
        </div>
      </div>
    </>
  );
};

export default Introduction;
