import { createContext, useEffect, useState } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import keyring from '@polkadot/ui-keyring';
import { getFromAcct } from '../helpers/helpers';

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
    submitQueries(con);
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
      console.log(e);
    }
  };

  const submitQueries = async (api) => {
    try {
      const data = await api.query.uniques.class();
      const value = data && data.value.toHuman();
      console.log(data);
      console.log(value);
    } catch (e) {
      console.log(e);
    }
  };
  // Transactions //
  const subtmitTransactions = (sender, transaction) => {
    return new Promise(async (resolve, reject) => {
      try {
        const unsub = await transaction.signAndSend(sender, (result) => {
          if (result.status.isFinalized) {
            setStatus(
              `😉 Finalized. Block hash: ${result.status.asFinalized.toString()}`
            );
            resolve();
            unsub();
          } else {
            setStatus(`Current transaction status: ${result.status.type}`);
          }
        });
      } catch (e) {
        reject(e.toString());
      }
    });
  };

  // Get Tokens  //
  const getTokens = async (address) => {
    const fromAcct = await getFromAcct(address, api, keyring);
    let txExecute = api.tx.faucet.claimTokens();
    return await subtmitTransactions(fromAcct, txExecute);
  };

  // // Create a new Class/Collection //
  // const createCollection = async (id, property, value) => {
  //   const fromAcct = await getFromAcct(main, api, keyring);
  //   const create = [id, fromAcct];
  // };

  // const createInstance = async (classId, instanceId, property, value) => {
  //   console.log('InstanceCreated');
  // };

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
      }}
    >
      {children}
    </SubstrateContext.Provider>
  );
};
