import { createContext, useEffect, useState } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import keyring from '@polkadot/ui-keyring';
import { helper, attributes } from '../helpers';
import beer from 'beer-names';

export const SubstrateContext = createContext();
export const SubstrateProvider = ({ children }) => {
  const [api, setapi] = useState(null);
  const [accounts, setaccounts] = useState([]);
  const [balances, setbalances] = useState({});
  const [main, setmain] = useState('');
  const [status, setStatus] = useState('Nothing for the moment');
  const [loading, setloading] = useState(true);
  const { beersColors, beersType, collectionsAttributes, instancesAttributes } = attributes;
  const connection = async () => {
    const wsProvider = new WsProvider('wss://testnet-rpc.walchain.be:443');
    let con = await ApiPromise.create({ provider: wsProvider });
    loadAccounts(con);
    setapi(con);
    setloading(false);
  };

  const loadAccounts = async (api) => {
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

  const changeAccount = (account) => {
    setmain(account);
  };

  // Get Tokens  //
  const getTokens = async (api, address) => {
    try {
      const fromAcct = await helper.getFromAcct(address, api, keyring);
      let txExecute = api.tx.faucet.claimTokens();
      return await helper.submitTransactions(fromAcct, txExecute, api, setStatus);
    } catch (e) {
      console.log(e);
    }
  };
  // Create a new Class/Collection //
  const createCollection = async (id, value) => {
    try {
      const fromAcct = await helper.getFromAcct(main, api, keyring);
      const collection = [id, main];
      const collectionName = [id, null, collectionsAttributes[0], value];
      let txExecute = api.tx.uniques.create(...collection);
      let setName = api.tx.uniques.setAttribute(...collectionName);
      return await helper.submitTransactions(fromAcct, [txExecute, setName], api, setStatus);
    } catch (e) {
      return;
    }
  };
  // Create a new Asset for a specific Collection //
  const createAsset = async (id, instanceId) => {
    try {
      const fromAcct = await helper.getFromAcct(main, api, keyring);
      const instance = [id, instanceId, fromAcct];
      let randomName = beer.random();
      const suffixPos = randomName.indexOf(' ', randomName.indexOf(' ') + 1);
      const firstName = randomName.substring(0, suffixPos);
      const name = [id, instanceId, instancesAttributes[0], firstName];
      const color = [id, instanceId, instancesAttributes[1], beersColors[Math.floor(Math.random() * beersColors.length)]];
      const type = [id, instanceId, instancesAttributes[2], randomName.substring(suffixPos + 1)];
      const category = [id, instanceId, instancesAttributes[3], beersType[Math.floor(Math.random() * beersType.length)]];
      const identifier = [id, instanceId, instancesAttributes[4], instanceId];
      let txExecute = api.tx.uniques.mint(...instance);
      let setName = api.tx.uniques.setAttribute(...name);
      let setColor = api.tx.uniques.setAttribute(...color);
      let setCategory = api.tx.uniques.setAttribute(...category);
      let setType = api.tx.uniques.setAttribute(...type);
      let setIdentifier = api.tx.uniques.setAttribute(...identifier);
      return await helper.submitTransactions(fromAcct, [txExecute, setName, setColor, setCategory, setType, setIdentifier], api, setStatus);
    } catch (e) {
      console.log(e);
      return;
    }
  };

  // Create 200 assets for a specific collection //
  const createTonsAssets = async (id) => {
    try {
      let arrayNumber = Array.from(Array(80).keys());
      // remove later
      arrayNumber.shift();
      arrayNumber.shift();
      arrayNumber = arrayNumber.map((id) => id.toString());
      const fromAcct = await helper.getFromAcct(main, api, keyring);
      let txExecute = [];
      await Promise.all(
        arrayNumber.map(async (instanceId) => {
          const instance = [id, instanceId, fromAcct];
          let randomName = beer.random();
          const suffixPos = randomName.indexOf(' ', randomName.indexOf(' ') + 1);
          const firstName = randomName.substring(0, suffixPos);
          const name = [id, instanceId, instancesAttributes[0], firstName];
          const color = [id, instanceId, instancesAttributes[1], beersColors[Math.floor(Math.random() * beersColors.length)]];
          const type = [id, instanceId, instancesAttributes[2], randomName.substring(suffixPos + 1)];
          const category = [id, instanceId, instancesAttributes[3], beersType[Math.floor(Math.random() * beersType.length)]];
          const identifier = [id, instanceId, instancesAttributes[4], instanceId];
          let tx = api.tx.uniques.mint(...instance);
          let setName = api.tx.uniques.setAttribute(...name);
          let setColor = api.tx.uniques.setAttribute(...color);
          let setCategory = api.tx.uniques.setAttribute(...category);
          let setType = api.tx.uniques.setAttribute(...type);
          let setIdentifier = api.tx.uniques.setAttribute(...identifier);
          txExecute.push(tx, setName, setColor, setType, setCategory, setIdentifier);
        })
      );
      return await helper.submitTransactions(fromAcct, txExecute, api, setStatus);
    } catch (e) {
      console.log(e);
    }
  };

  // Transfer Assets to someone else //
  const transferAsset = async (transaction) => {
    const data = [transaction.collection, transaction.id, transaction.address];
    const fromAcct = await helper.getFromAcct(main, api, keyring);
    let txExecute = api.tx.uniques.transfer(...data);
    return await helper.submitTransactions(fromAcct, txExecute, api, setStatus);
  };

  useEffect(() => {
    connection();
  }, []);
  return (
    <SubstrateContext.Provider
      value={{
        api,
        accounts,
        balances,
        getTokens,
        status,
        main,
        loading,
        createCollection,
        createAsset,
        createTonsAssets,
        transferAsset,
        changeAccount,
      }}
    >
      {children}
    </SubstrateContext.Provider>
  );
};
