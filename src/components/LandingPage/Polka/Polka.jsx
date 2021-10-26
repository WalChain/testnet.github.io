import styles from './Polka.module.scss';
import DownloadIcon from '@mui/icons-material/Download';
import polkaIcon from '../../../assets/Polka/PolkaIcon.svg';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link } from 'react-router-dom';

const Polka = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.block}>
          <div className={styles.icon}>
            <img src={polkaIcon} alt='' />
          </div>
          <div className={styles.text}>
            The polkadot extension and an account will be necessary to continue
            <br />
            Do not hesitate to follow the instructions if you are lost
          </div>
          <Link to='instructions' style={{ textDecoration: 'none' }}>
            <div className={styles.button}>
              <div className={styles.download}>INSTRUCTIONS</div>
              <div className={styles.dll}>
                <MenuBookIcon />
              </div>
            </div>
          </Link>
          <div className={styles.button}>
            <a href='https://polkadot.js.org/extension/' target='_blank rel="noreferrer" '>
              <div className={styles.download}>DOWNLOAD EXTENSION</div>
              <div className={styles.dll}>
                <DownloadIcon />
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Polka;
