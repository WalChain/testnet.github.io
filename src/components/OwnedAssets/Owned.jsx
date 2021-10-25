import { useEffect, useState, useContext } from 'react';
import { queries } from '../../helpers';
import { SubstrateContext } from '../../services/substrate';
import styles from './Owned.module.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import BeerSVG from '../../assets/assetsPage/BeerSVG';
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

const Owned = () => {
  const { api, main, accounts } = useContext(SubstrateContext);
  const [assets, setassets] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [open, setopen] = useState(false);
  const assetsPerPage = (width) => {
    return (width >= 1800 && 15) || (width < 1800 && screen.width >= 1600 && 12) || (width < 1600 && width > 500 && 9) || (width < 500 && 5);
  };
  const [loading, setloading] = useState(true);
  let pageNumber = Math.ceil(assets.length / assetsPerPage(screen.width));

  // Get Current assets //
  const indexOfLastAsset = currentPage * assetsPerPage(screen.width);
  const indexOfFirstPost = indexOfLastAsset - assetsPerPage(screen.width);
  const currentAssets = assets.slice(indexOfFirstPost, indexOfLastAsset);
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
    console.log(target);
    setopen(true);
  };
  const handleClose = () => {
    setopen(false);
  };
  useEffect(() => {
    const get = async () => {
      const tempAssets = await queries.getAccountAssets(api, main);
      setloading(false);
      setassets(tempAssets);
    };
    api && main && get();
  }, [main]);
  console.log(accounts);
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
                  <ReactCardFlip key={asset.identifier} isFlipped={asset.flip} flipDirection='horizontal'>
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
                        <BeerSVG asset={asset} />
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
                        <p>Owner : {asset.owner}</p>
                        <div onClick={() => handleClickOpen(asset)}> Transfert</div>
                      </div>
                    </div>
                  </ReactCardFlip>
                );
              })}
          </div>
          <Stack className={styles.pagination} spacing={2}>
            <Pagination
              count={pageNumber}
              color='primary'
              size={`${screen.width > 400 ? 'large' : 'small'}`}
              onChange={(e, page) => handleChange(e, page)}
            />
          </Stack>
        </>
      )}
      <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>Destinataire</DialogTitle>
        <DialogContent>
          <Box className={styles.dialog} sx={{ minWidth: 120 }}>
            <FormControl style={{ width: '200px' }}>
              <InputLabel id='demo-simple-select-label'>Name</InputLabel>
              <Select labelId='demo-simple-select-label' id='demo-simple-select' value='' label='asset' onChange={handleChange}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Owned;
