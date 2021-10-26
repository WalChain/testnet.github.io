import styles from './Navbar.module.scss';
import logo from '../../../assets/Navbar/WalchainLogo.svg';
import MenuIcon from '@mui/icons-material/Menu';
import { forwardRef, useImperativeHandle, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { SubstrateContext } from '../../../services/substrate';

const Navbar = forwardRef((props, ref) => {
  const { accounts, main, changeAccount } = useContext(SubstrateContext);
  const [dropdown, setdropdown] = useState(false);
  const [open, setopen] = useState(false);
  const [selected, setselected] = useState('');

  useImperativeHandle(ref, () => ({
    toggle(e) {
      e.target.closest('[data-dropdown]') ? setdropdown(!dropdown) : setdropdown(false);
    },
  }));

  const handleChange = (e) => {
    setselected(e.target.value);
  };

  const confirm = () => {
    changeAccount(selected);
    setopen(false);
  };

  useEffect(() => {
    setselected(main);
  }, [main]);
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
          <Link to='/owned' className={styles.link} data-content='MY NFT'>
            MY NFT
          </Link>
          <a className={styles.link} onClick={() => setopen(true)} data-content='ACCOUNTS'>
            ACCOUNTS
          </a>
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
            <Link to='/owned' className={`${styles.smLink} reactLink`}>
              MY NFT
            </Link>
            <a to='/owned' className={`${styles.smLink} reactLink`}>
              ACCOUNTS
            </a>
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={() => setopen(false)} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>Select an account</DialogTitle>
        <DialogContent>
          <Box className={styles.dialog} sx={{ minWidth: 120 }}>
            <FormControl style={{ width: '300px' }}>
              <InputLabel id='demo-simple-select-label'>Name</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='asset'
                name='address'
                value={selected || ''}
                onChange={(e) => handleChange(e)}
              >
                {accounts.map((acc) => {
                  return (
                    <MenuItem key={acc.address} value={acc.address}>
                      {acc.meta.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setopen(false)}>Cancel</Button>
          <Button autoFocus onClick={confirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
