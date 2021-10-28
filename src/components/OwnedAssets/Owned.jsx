import { useEffect, useState, useContext } from 'react';
import { queries } from '../../helpers';
import { SubstrateContext } from '../../services/substrate';
import styles from './Owned.module.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import SvgComponent from '../../assets/assetsPage/SvgComponent';
import GridLoader from 'react-spinners/GridLoader';
import ReactCardFlip from 'react-card-flip';
import { attributes } from '../../helpers';
import category1 from '../../assets/assetsPage/category1.jpg';
import category2 from '../../assets/assetsPage/category2.png';
import category3 from '../../assets/assetsPage/category3.jpg';
import category4 from '../../assets/assetsPage/category4.jpg';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Owned = () => {
  const { api, main, accounts, transferAsset } = useContext(SubstrateContext);
  const [assets, setassets] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [open, setopen] = useState(false);
  const [transaction, settransaction] = useState({});
  const assetsPerPage = (width) => {
    return (
      (width >= 1910 && 18) ||
      (width < 1910 && width >= 1800 && 15) ||
      (width < 1800 && width >= 1600 && 12) ||
      (width < 1600 && width > 500 && 9) ||
      (width < 500 && 5)
    );
  };
  const [loading, setloading] = useState(true);
  let pageNumber = Math.ceil(assets && assets.length / assetsPerPage(screen.width));

  // Get Current assets //
  const indexOfLastAsset = currentPage * assetsPerPage(screen.width);
  const indexOfFirstPost = indexOfLastAsset - assetsPerPage(screen.width);
  const currentAssets = assets && assets.slice(indexOfFirstPost, indexOfLastAsset);
  const handleChange = (e, page) => {
    page === null && null;
    page !== null && setcurrentPage(page);
  };

  const flip = (asset) => {
    let index = assets.findIndex((obj) => obj.identifier == asset.identifier);
    let allAssets = [...assets];
    allAssets[index].flip = !allAssets[index].flip;
    setassets(allAssets);
  };

  const getId = (id) => {
    const first = id.split('').at(-1);
    return first;
  };

  const handleClickOpen = (target) => {
    settransaction({ collection: target.collection, id: target.identifier });
    setopen(true);
  };
  const handleClose = () => {
    setopen(false);
  };
  const send = async (transaction) => {
    try {
      setloading(true);
      setopen(false);
      await transferAsset(transaction);
      setassets(assets.filter((asset) => asset.identifier !== transaction.id));
      setloading(false);
    } catch (e) {
      setloading(false);
    }
  };
  const get = async () => {
    const tempAssets = await queries.getAccountAssets(api, main);
    setloading(false);
    setassets(tempAssets);
  };

  useEffect(() => {
    api && main && get();
  }, [main, accounts]);
  return (
    <div className={styles.body}>
      {loading && (
        <div className='spinner'>
          <GridLoader color='#8AE6D5' />
        </div>
      )}
      {!loading && (
        <>
          <div className={styles.container}>
            {assets &&
              currentAssets.map((asset) => {
                return (
                  <ReactCardFlip
                    key={asset.identifier}
                    isFlipped={asset.flip}
                    flipDirection='horizontal'
                    flipSpeedBackToFront='0.3'
                    flipSpeedFrontToBack='0.3'
                  >
                    <div className={`${styles.card}`} onClick={() => flip(asset)}>
                      <div className={styles['front-ribbon']} style={{ backgroundColor: attributes.idColor[getId(asset.identifier)] }}>
                        #{asset.identifier}
                      </div>
                      <div className={styles.title}>{asset.name}</div>
                      <div className={styles.type}>{asset.type}</div>
                      <img
                        src={
                          (asset.category === '1' && category1) ||
                          (asset.category === '2' && category2) ||
                          (asset.category === '3' && category3) ||
                          (asset.category === '4' && category4)
                        }
                        alt='background'
                        className={styles.background}
                      />
                      <div className={styles.img}>
                        <SvgComponent asset={asset} />
                      </div>
                    </div>
                    <div className={`${styles.card}`} onClick={() => flip(asset)}>
                      <div className={styles.content}>
                        <img
                          src={
                            (asset.category === '1' && category1) ||
                            (asset.category === '2' && category2) ||
                            (asset.category === '3' && category3) ||
                            (asset.category === '4' && category4)
                          }
                          className={styles.background}
                          alt='background'
                        />
                        <h3>{asset.name}</h3>
                        <p>Type : {asset.type}</p>
                        <p>Color : {asset.color}</p>
                        <p className={styles.address}>Owner : {asset.owner}</p>
                        <div onClick={() => handleClickOpen(asset)}> Transfer</div>
                      </div>
                    </div>
                  </ReactCardFlip>
                );
              })}
          </div>
          {assets && assets.length !== 0 && (
            <Stack className={styles.pagination} spacing={2}>
              <Pagination
                count={pageNumber}
                color='primary'
                size={`${screen.width > 400 ? 'large' : 'small'}`}
                onChange={(e, page) => handleChange(e, page)}
              />
            </Stack>
          )}
        </>
      )}
      <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>Recipient</DialogTitle>
        <DialogContent>
          <Box className={styles.dialog} sx={{ minWidth: 120 }}>
            <FormControl style={{ width: '400px' }}>
              {/* <Select
                defaultValue=''
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={transaction.address || ''}
                label='asset'
                name='address'
                onChange={(event) =>
                  settransaction((prevState) => {
                    return { ...prevState, address: event.target.value };
                  })
                }
              >
                {AccountsList.map((acc) => {
                  return (
                    <MenuItem key={acc.address} value={acc.address}>
                      {acc.meta.name}
                    </MenuItem>
                  );
                })}
              </Select> */}
              <TextField
                required
                id='outlined-required'
                label='Required'
                defaultValue=''
                onChange={(event) =>
                  settransaction((prevState) => {
                    return { ...prevState, address: event.target.value };
                  })
                }
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => send(transaction)} autoFocus>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Owned;
