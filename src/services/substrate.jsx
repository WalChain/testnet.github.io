import { createContext, useEffect, useState } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';

export const SubstrateContext = createContext();
export const SubstrateProvider = ({ children }) => {
  const [api, setapi] = useState(null);
  const [accounts, setaccounts] = useState([]);

  const connection = async () => {
    const wsProvider = new WsProvider('wss://testnet-rpc.walchain.be:443');
    let con = await ApiPromise.create({ provider: wsProvider });
    setapi(con);
  };

  const loadAccounts = async () => {
    await web3Enable('Walchain Testnet');
    let accs = await web3Accounts();
    accs = accs.map(({ address, meta }) => {
      return {
        address: address,
        meta: {
          ...meta,
          name: `${meta.name} ${meta.isInjected ? `(${meta.source})` : ''}`,
        },
      };
    });
    const addresses = accs.map((account) => account.address);
    api.query.system.account.multi(addresses, (balances) => {
      const balancesMap = addresses.reduce(
        (acc, address, index) => ({
          ...acc,
          [address]: balances[index].data.free.toHuman(),
        }),
        {}
      );
      setaccounts(balancesMap);
    });
  };

  useEffect(() => {
    connection();
  }, []);
  return (
    <SubstrateContext.Provider value={{ api, accounts }}>
      {children}
    </SubstrateContext.Provider>
  );
};
