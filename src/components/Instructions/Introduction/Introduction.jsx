import styles from './Introduction.module.scss';
import sphere from '../../../assets/Instructions/Sphere.png';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const Introduction = ({ scroll }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.centerblock}>
          <div className={styles.leftside}>
            <img src={sphere} alt='sphere' className={styles.sphere} />
          </div>
          <div className={styles.rightside}>
            <div className={styles.title}>Welcome to the installation guide</div>
            <div className={styles['first-paragraph']}>There&apos;s nothing simpler, just follow the guide below</div>
            <div className={styles['second-paragraph']}>
              Walchain runs thanks to Polkadot which is the strongest plateform in terms of security, evolution and innovation
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div>START</div>
          <div
            className={styles.arrow}
            onClick={() => {
              scroll();
            }}
          >
            <DoubleArrowIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default Introduction;
