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
            <Link className='reactLink' to='/owned'>
              MY NFT
            </Link>
          </div>
          <div>
            <Link className='reactLink' to='/'>
              INSTRUCTIONS
            </Link>
          </div>
          {/* <div>
            <Link className='reactLink' to='/dev'>
              DEV
            </Link>
          </div> */}
        </div>
        <hr />
        <div className={styles.text}>
          The Blockchain in Wallonie <br />
          The WalChain initiative, born from the gathering of Walloon blockchain startups. The purpose is to promote &quot;Made in Wallonia&quot;
          blockchain as the innovative tool for building collaborative and transparent ecosystems but is also an opportunity to contrinute to a
          sustainable economic redeployment in Wallonia
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
