import { useEffect, useContext, useState } from 'react';
import { queries } from '../../helpers';
import { SubstrateContext } from '../../services/substrate';
import { pink } from '@mui/material/colors';
import FadeLoader from 'react-spinners/FadeLoader';
import styles from './AllCollection.module.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';

const Allcollections = () => {
  const { api, loading } = useContext(SubstrateContext);
  const [collections, setcollections] = useState([]);
  useEffect(async () => {
    api && setcollections(await queries.getAllCollections(api));
  }, [api]);
  return (
    <>
      {loading && (
        <div className='spinner'>
          <FadeLoader color='#8AE6D5' />
        </div>
      )}
      <div className={styles.container}>
        {!loading && (
          <div className={styles.box}>
            <div className={styles.content}>
              <div className={styles.title}>Collections</div>
              <hr />
              <div className={styles.body}>
                {collections &&
                  collections.map((collection) => {
                    return (
                      <Link key={collection.identifier} to={`asset/${collection.identifier}`} className='reactLink'>
                        <div className={styles.collection}>
                          <span className={styles.text}>{collection.name}</span>
                          <span className={styles.icon}>
                            <ArrowForwardIosIcon sx={{ color: pink[500] }} fontSize='small' />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Allcollections;
