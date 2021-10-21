import styles from './Navbar.module.scss';
import logo from '../../../assets/Navbar/WalchainLogo.svg';
import MenuIcon from '@mui/icons-material/Menu';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = forwardRef((props, ref) => {
  const [dropdown, setdropdown] = useState(false);

  useImperativeHandle(ref, () => ({
    toggle(e) {
      e.target.closest('[data-dropdown]') ? setdropdown(!dropdown) : setdropdown(false);
    },
  }));

  return (
    <div className={styles.nav}>
      <div className={styles.links}>
        <div className={styles.logo}>
          <img className={styles.walchain} src={logo} alt='walchain logo' />
        </div>
        <div className={styles.mdLinks}>
          <Link to='/' className={styles.link} data-content='HOME'>
            HOME
          </Link>

          <Link to='/collections' className={styles.link} data-content='COLLECTIONS'>
            COLLECTIONS
          </Link>
          <div className={styles.link} data-content='ABOUT US'>
            ABOUT US
          </div>
        </div>
        <div className={styles.dropdown}>
          <div className={styles.hamburger} data-dropdown>
            <MenuIcon data-dropdown />
          </div>
          <div className={`${styles.dropMenu} ${dropdown && styles.active}`}>
            <Link to='/' className={`${styles.smLink} reactLink`}>
              HOME
            </Link>
            <Link to='/collections' className={`${styles.smLink} reactLink`}>
              COLLECTIONS
            </Link>
            <div className={styles.smLink}>ABOUT US</div>
          </div>
        </div>
      </div>
    </div>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
