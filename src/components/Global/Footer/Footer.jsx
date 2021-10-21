import styles from './Footer.module.scss';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.links}>
          <div>
            <Link className='reactLink' to='/'>
              HOME
            </Link>
          </div>
          <div>
            <Link className='reactLink' to='/collections'>
              COLLECTIONS
            </Link>
          </div>
          <div>
            <Link className='reactLink' to='/instructions'>
              INSTRUCTIONS
            </Link>
          </div>
          <div>CONTACTS</div>
          <div>ABOUT</div>
        </div>
        <hr />
        <div className={styles.text}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas et itaque culpa labore maiores veniam soluta assumenda sapiente distinctio
          quod pariatur vero dolor repellat saepe, similique laborum alias explicabo illo? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Molestias laborum incidunt suscipit! Laborum blanditiis, aspernatur neque ratione dolore voluptatum rerum itaque rem, alias modi corporis
          labore commodi doloremque amet dolorum.
        </div>
        <div className={styles.blockicons}>
          <div className={styles.icons}>
            <LinkedInIcon className={styles.icon} />
            <FacebookIcon className={styles.icon} />
            <TwitterIcon className={styles.icon} />
          </div>
        </div>
      </div>
      <div className={styles.bottomText}>Designed, developed and offered by mi8 / block0</div>
    </div>
  );
};

export default Footer;
