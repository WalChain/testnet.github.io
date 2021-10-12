import styles from './Content.module.scss';
import DownloadIcon from '@mui/icons-material/Download';
import step1 from '../../../../assets/Instructions/step1.png';

const Content = ({ number }) => {
  return (
    <div className={styles.container}>
      <div className={styles['center-block']}>
        <div className={styles['left-side']}>
          <div className={styles.content}>
            <div className={styles.title}>Etape {number}</div>
            <div className={styles.paragraph}>
              Installer l&apos;extension chrome, en cliquant sur le lien
              ci-dessous
            </div>
            <div className={styles.button}>
              <a
                href='https://polkadot.js.org/extension/'
                target='_blank rel="noreferrer" '
              >
                <div className={styles.download}>DOWNLOAD EXTENSION</div>
                <div className={styles.dll}>
                  <DownloadIcon />
                </div>
              </a>
            </div>
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
