import { useContext, useEffect, useState } from 'react';
import { SubstrateContext } from '../../services/substrate';
import FadeLoader from 'react-spinners/FadeLoader';

const Develop = () => {
  const { api, loadAccounts, accounts, balances, getTokens, status, createCollection, createAsset, createTonsAssets, loading } =
    useContext(SubstrateContext);
  const [collection, setcollection] = useState({});
  const [instance, setinstance] = useState({});
  const [tons, settons] = useState({});
  useEffect(() => {
    api && loadAccounts();
    return () => api && loadAccounts();
  }, [api]);

  const onChange = (e, target) => {
    if (target === 'collection') {
      setcollection((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value };
      });
    }
    if (target === 'instance') {
      setinstance((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value };
      });
    }
    if (target === 'tons') {
      settons((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value };
      });
    }
  };

  const submit = (e, target) => {
    e.preventDefault();
    if (target === 'collection') {
      createCollection(collection.id, collection.name);
    }
    if (target === 'instance') {
      createAsset(instance.id, instance.instanceId);
    }
    if (target === 'tons') {
      createTonsAssets(tons.id);
    }
  };

  return (
    <>
      {loading && (
        <div className='spinner'>
          <FadeLoader color='#8AE6D5' />
        </div>
      )}

      {!loading &&
        accounts &&
        accounts.map((account) => {
          return (
            <div key={account.address}>
              <p>
                {account.meta.name}:{account.address} : {balances[`${account.address}`]}
              </p>
              <button onClick={() => getTokens(api, account.address)}>get token</button>
            </div>
          );
        })}
      {!loading && (
        <div>
          {' '}
          <br />
          <br />
          {status}
          <br />
          <br />
          <form onSubmit={(e) => submit(e, 'collection')}>
            <input type='number' name='id' onChange={(e) => onChange(e, 'collection')} />
            <input type='text' name='name' onChange={(e) => onChange(e, 'collection')} placeholder='name' />
            <button type='submit'>create class</button>
          </form>
          <br />
          <br />
          <form onSubmit={(e) => submit(e, 'instance')}>
            <input type='number' name='id' onChange={(e) => onChange(e, 'instance')} />
            <input type='number' name='instanceId' onChange={(e) => onChange(e, 'instance')} />
            <button type='submit'>create beer</button>
          </form>
          <br />
          <br />
          <form onSubmit={(e) => submit(e, 'tons')}>
            <input type='number' name='id' onChange={(e) => onChange(e, 'tons')} />
            <button type='submit'>GENERATE TONS</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Develop;
