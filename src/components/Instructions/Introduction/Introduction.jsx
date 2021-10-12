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
            <div className={styles.title}>
              Bienvenue dans le guide d&apos;installation
            </div>
            <div className={styles['first-paragraph']}>
              Pour pouvoir accéder à la Walchain, rien de bien compliquer, il
              vous suffit de suivre le guide ci-dessous
            </div>
            <div className={styles['second-paragraph']}>
              La Walchain tourne sous Polkadot, qui est actuellement la
              plate-forme la plus robuste en matière de sécurité,
              d&apos;évolutivité et d&apos;innovation
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
