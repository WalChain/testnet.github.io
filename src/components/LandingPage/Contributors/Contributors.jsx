import { useEffect, useState } from 'react';
import styles from './Contributors.module.scss';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';

const Contributors = () => {
  const [state, setstate] = useState([]);
  useEffect(() => {
    getPictures();
  }, []);
  const getPictures = async () => {
    let users = await axios.get('https://randomuser.me/api/?results=100');
    setstate(users.data.results);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.text}>
            <p>Seul, on va vite, mais à plusieurs, on va plus loin…</p>
            <p>Merci à tous nos contributeurs.</p>
          </div>
          <div className={styles.contributors}>
            {state &&
              state.map((user) => {
                return (
                  <Avatar
                    className={styles.avatar}
                    key={user.login.uuid}
                    alt={user.login.username}
                    src={user.picture.medium}
                    sx={{ width: 60, height: 60 }}
                  />
                );
              })}
          </div>
          <div className={styles.bottomText}>
            Designed, developed and offered by mi8 / block0
          </div>
        </div>
      </div>
    </>
  );
};

export default Contributors;
