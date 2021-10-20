import { web3FromSource } from '@polkadot/extension-dapp';
// Get Selected account , for the moment, the account is hardcoded //
export const getFromAcct = async (main, api, keyring) => {
  const tempAcct = keyring.getPair(main);
  const {
    address,
    meta: { source, isInjected },
  } = tempAcct;
  let fromAcct;
  if (isInjected) {
    const injected = await web3FromSource(source);
    fromAcct = address;
    api.setSigner(injected.signer);
  } else {
    fromAcct = tempAcct;
  }
  return fromAcct;
};

export const submitTransactions = (sender, transaction, api, setStatus) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (Array.isArray(transaction)) {
        const unsub = await api.tx.utility.batchAll(transaction).signAndSend(sender, (result) => {
          txHandler(result, resolve, unsub, setStatus);
        });
      } else {
        const unsub = await transaction.signAndSend(sender, (result) => {
          txHandler(result, resolve, unsub, setStatus);
        });
      }
    } catch (e) {
      reject(e.toString());
    }
  });
};

const txHandler = (result, resolve, unsub, setStatus) => {
  if (result.status.isFinalized) {
    setStatus(`😉 Finalized. Block hash: ${result.status.asFinalized.toString()}`);
    resolve();
    unsub();
  } else {
    setStatus(`Current transaction status: ${result.status.type}`);
  }
};
