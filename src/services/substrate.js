import { createContext, useState } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';

export const SubstrateContext = createContext();
export const SubstrateProvider = ({ children }) => {
  const [api, setapi] = useState(null);

  const connection = async () => {
    const wsProvider = new WsProvider('wss://testnet-rpc.walchain.be:443');
    let con = await ApiPromise.create({ provider: wsProvider });
    setapi(con);
  };

  const loadAccounts = async () => {
    let extension = await web3Enable('BlockChain Application');
    console.log(extension[0]);
    let accs = await web3Accounts();
    return accs;
  };

  return (
    <SubstrateContext.Provider value={{ connection, api, loadAccounts }}>
      {children}
    </SubstrateContext.Provider>
  );
};
