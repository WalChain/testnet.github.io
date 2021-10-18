import { createContext, useEffect, useState } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import keyring from '@polkadot/ui-keyring';
import { getFromAcct, submitTransactions, getAllCollections, getAllAssets } from '../helpers/helpers';
import { beersColors, beersType, collectionsAttributes, instancesAttributes } from '../helpers/dataInfo';
import beer from 'beer-names';

export const SubstrateContext = createContext();
export const SubstrateProvider = ({ children }) => {
  const [api, setapi] = useState(null);
  const [accounts, setaccounts] = useState([]);
  const [balances, setbalances] = useState({});
  const [main, setmain] = useState('');
  const [status, setStatus] = useState('Nothing for the moment');

  const connection = async () => {
    const wsProvider = new WsProvider('wss://testnet-rpc.walchain.be:443');
    let con = await ApiPromise.create({ provider: wsProvider });
    setapi(con);
    console.log(await getAllCollections(con));
    console.log(await getAllAssets(con, 2));
  };

  const loadAccounts = async () => {
    try {
      await web3Enable('Walchain Testnet');
      let accs = await web3Accounts();
      keyring.loadAll({ isDevelopment: true }, accs);
      accs = accs.map(({ address, meta }) => {
        return {
          address: address,
          meta: {
            ...meta,
            name: `${meta.name} ${meta.isInjected ? `(${meta.source})` : ''}`,
          },
        };
      });
      setmain(accs[0].address);
      setaccounts(accs);
      const addresses = accs.map((account) => account.address);
      let unsubscribeAll = null;
      api.query.system.account
        .multi(addresses, (balances) => {
          const balancesMap = addresses.reduce(
            (acc, address, index) => ({
              ...acc,
              [address]: balances[index].data.free.toHuman(),
            }),
            {}
          );
          setbalances(balancesMap);
        })
        .then((unsub) => {
          unsubscribeAll = unsub;
        })
        .catch(console.error);
      return unsubscribeAll;
    } catch (e) {
      return;
    }
  };

  // Get Tokens  //
  const getTokens = async (address) => {
    const fromAcct = await getFromAcct(address, api, keyring);
    let txExecute = api.tx.faucet.claimTokens();
    return await submitTransactions(fromAcct, txExecute, api, setStatus);
  };

  // Create a new Class/Collection //
  const createCollection = async (id, value) => {
    const fromAcct = await getFromAcct(main, api, keyring);
    const collection = [id, main];
    const collectionName = [id, null, collectionsAttributes[0], value];
    let txExecute = api.tx.uniques.create(...collection);
    let setName = api.tx.uniques.setAttribute(...collectionName);
    return await submitTransactions(fromAcct, [txExecute, setName], api, setStatus);
  };

  // Create a new Asset for a specific Collection //
  const createAsset = async (id, instanceId) => {
    const fromAcct = await getFromAcct(main, api, keyring);
    const instance = [id, instanceId, fromAcct];
    const name = [id, instanceId, instancesAttributes[0], beer.random()];
    const color = [id, instanceId, instancesAttributes[1], beersColors[Math.floor(Math.random() * beersColors.length)]];
    const type = [id, instanceId, instancesAttributes[2], beersType[Math.floor(Math.random() * beersType.length)]];
    let txExecute = api.tx.uniques.mint(...instance);
    let setName = api.tx.uniques.setAttribute(...name);
    let setColor = api.tx.uniques.setAttribute(...color);
    let setType = api.tx.uniques.setAttribute(...type);
    return await submitTransactions(fromAcct, [txExecute, setName, setColor, setType], api, setStatus);
  };

  useEffect(() => {
    connection();
  }, []);
  return (
    <SubstrateContext.Provider
      value={{
        api,
        loadAccounts,
        accounts,
        balances,
        getTokens,
        status,
        main,
        createCollection,
        createAsset,
      }}
    >
      {children}
    </SubstrateContext.Provider>
  );
};
