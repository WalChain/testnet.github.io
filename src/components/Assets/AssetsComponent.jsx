import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { queries } from '../../helpers';
import { SubstrateContext } from '../../services/substrate';
import styles from './AssetsComponent.module.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Svg1 from './svg/svg1';
import Svg2 from './svg/svg2';
import Svg3 from './svg/svg3';
import Svg4 from './svg/svg4';
import GridLoader from 'react-spinners/GridLoader';
import ReactCardFlip from 'react-card-flip';

const Assetscomponent = () => {
  const { api } = useContext(SubstrateContext);
  let { id } = useParams();
  const [assets, setassets] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const assetsPerPage = 15;
  const [loading, setloading] = useState(true);
  let pageNumber = Math.ceil(assets.length / assetsPerPage);

  // Get Current assets //
  const indexOfLastAsset = currentPage * assetsPerPage;
  const indexOfFirstPost = indexOfLastAsset - assetsPerPage;
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
      {!loading && (
        <>
          <div className={styles.container}>
            {assets &&
              currentAssets.map((asset) => {
                return (
                  <ReactCardFlip key={asset.identifier} isFlipped={asset.flip} flipDirection='horizontal'>
                    <div className={`${styles.card}`} onClick={() => flip(asset)}>
                      <div className={styles.title}>{asset.name}</div>
                      <div className={styles.identifier}>{asset.identifier}</div>
                      <div className={styles.type}>{asset.type}</div>
                      {asset.category === '1' && (
                        <div className={styles.img}>
                          <Svg1 asset={asset} />
                        </div>
                      )}
                      {asset.category === '2' && (
                        <div className={styles.img}>
                          <Svg2 asset={asset} />
                        </div>
                      )}
                      {asset.category === '3' && (
                        <div className={styles.img}>
                          <Svg3 asset={asset} />
                        </div>
                      )}
                      {asset.category === '4' && (
                        <div className={styles.img}>
                          <Svg4 asset={asset} />
                        </div>
                      )}
                    </div>

                    <div className={`${styles.card}`} onClick={() => flip(asset)}>
                      <div className={styles.content}>
                        <h3>{asset.name}</h3>
                        <p>Type : {asset.type}</p>
                        <p>Color : {asset.color}</p>
                        <p>Owner : {asset.owner}</p>
                        <div> Acheter</div>
                      </div>
                    </div>
                  </ReactCardFlip>
                );
              })}
          </div>
          <Stack className={styles.pagination} spacing={2}>
            <Pagination count={pageNumber} color='primary' size='large' onChange={(e, page) => handleChange(e, page)} />
          </Stack>
        </>
      )}
    </div>
  );
};
export default Assetscomponent;
