import styles from './Navbar.module.scss';
import logo from '../../assets/Navbar/WalchainLogo.svg';
import MenuIcon from '@mui/icons-material/Menu';

const reload = () => {
  let path = window.location.pathname;
  console.log(`home link : ${path}`);
  if (path !== '/') {
    window.location.href = '/';
  }
};

const Navbar = ({ dropdown }) => {
  return (
    <div className={styles.nav}>
      <div className={styles.links}>
        <div className={styles.logo}>
          <img className={styles.walchain} src={logo} alt='walchain logo' />
        </div>
        <div className={styles.mdLinks}>
          <div
            className={styles.link}
            onClick={() => reload()}
            data-content='HOME'
          >
            HOME
          </div>

          <div className={styles.link} data-content='MARKETPLACE'>
            MARKETPLACE
          </div>
          <div className={styles.link} data-content='ABOUT US'>
            ABOUT US
          </div>
        </div>
        <div className={styles.dropdown}>
          <div className={styles.hamburger} data-dropdown>
            <MenuIcon data-dropdown />
          </div>
          <div className={`${styles.dropMenu} ${dropdown && styles.active}`}>
            <div className={styles.smLink} onClick={() => reload()}>
              HOME
            </div>
            <div className={styles.smLink}>MARKETPLACE</div>
            <div className={styles.smLink}>ABOUT US</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
