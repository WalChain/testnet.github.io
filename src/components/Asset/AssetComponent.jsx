import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { queries } from '../../helpers';
import { SubstrateContext } from '../../services/substrate';
import styles from './AssetComponent.module.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Svg1 from '../../assets/Assets/svg1';
import Svg2 from '../../assets/Assets/svg2';
import Svg3 from '../../assets/Assets/svg3';
import Svg4 from '../../assets/Assets/svg4';

const Assetcomponent = () => {
  const { api, loading } = useContext(SubstrateContext);
  let { id } = useParams();
  const [assets, setassets] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const assetsPerPage = 15;
  let pageNumber = Math.ceil(assets.length / assetsPerPage);

  // Get Current assets //
  const indexOfLastAsset = currentPage * assetsPerPage;
  const indexOfFirstPost = indexOfLastAsset - assetsPerPage;
  const currentAssets = assets.slice(indexOfFirstPost, indexOfLastAsset);
  const handleChange = (e) => {
    console.log(e.target.dataset.testid);
    console.log(typeof currentPage);
    if (e.target.dataset.testid == 'NavigateNextIcon') {
      setcurrentPage(parseInt(currentPage) + 1);
    } else if (e.target.dataset.testid == 'NavigateBeforeIcon') {
      setcurrentPage(parseInt(currentPage) - 1);
    } else {
      setcurrentPage(parseInt(e.target.innerText));
    }
  };

  const flip = (asset) => {
    let index = assets.findIndex((obj) => obj.identifier == asset.identifier);
    let allAssets = [...assets];
    allAssets[index].flip = !allAssets[index].flip;
    setassets(allAssets);
  };
  useEffect(async () => {
    api && setassets(await queries.getAllAssets(api, id));
  }, [api]);
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        {assets &&
          currentAssets.map((asset) => {
            return (
              <div key={asset.identifier} className={`${styles.card} ${asset.flip && styles.flip}`} onClick={() => flip(asset)}>
                <div className={styles.title}>{asset.name}</div>
                <div className={styles.identifier}>{asset.identifier}</div>
                <div className={styles.type}>{asset.type}</div>
                <div className={styles.img}>
                  <Svg1 />
                </div>
                <div className={`${styles.content} ${asset.flip && styles.opacity} ${!asset.flip && styles.hidden}`}>
                  <h3>{asset.name}</h3>
                  <p>Type : {asset.type}</p>
                  <p>Color : {asset.color}</p>
                  <p>Owner : {asset.owner}</p>
                  <div> Acheter</div>
                </div>
              </div>
            );
          })}
      </div>
      <Stack className={styles.pagination} spacing={2}>
        <Pagination count={pageNumber} color='primary' size='large' onChange={handleChange} />
      </Stack>
    </div>
  );
};
export default Assetcomponent;
