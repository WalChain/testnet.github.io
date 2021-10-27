import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { queries } from '../../helpers';
import { SubstrateContext } from '../../services/substrate';
import styles from './AssetsComponent.module.scss';
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

const Assetscomponent = () => {
  const { api } = useContext(SubstrateContext);
  let { id } = useParams();
  const [assets, setassets] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
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
  useEffect(() => {
    const get = async () => {
      const assets = await queries.getAllAssets(api, id);
      setassets(assets);
      setloading(false);
    };
    api && get();
  }, [api]);

  return (
    <div className={styles.body}>
      {loading && (
        <div className='spinner'>
          <GridLoader color='#8AE6D5' />
        </div>
      )}
      {!loading && assets.length !== 0 && (
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
                        <div> Acheter</div>
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
    </div>
  );
};
export default Assetscomponent;
