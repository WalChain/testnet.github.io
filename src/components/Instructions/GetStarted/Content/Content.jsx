import styles from './Content.module.scss';
import DownloadIcon from '@mui/icons-material/Download';
import step1 from '../../../../assets/Instructions/step1.png';

const Content = ({ number }) => {
  return (
    <div className={styles.container}>
      <div className={styles['center-block']}>
        <div className={styles['left-side']}>
          <div className={styles.content}>
            <div className={styles.title}>STEP {number}</div>
            <div className={styles.paragraph}>Install the extension by clicking on the button below</div>
            <a className={styles.button} href='https://polkadot.js.org/extension/' target='_blank rel="noreferrer" '>
              <div className={styles.download}>DOWNLOAD EXTENSION</div>
              <div className={styles.dll}>
                <DownloadIcon />
              </div>
            </a>
          </div>
        </div>
        <div className={styles['right-side']}>
          <img src={step1} alt='first step' className={styles.picture} />
        </div>
      </div>
    </div>
  );
};

export default Content;
