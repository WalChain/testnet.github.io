import { web3FromSource } from '@polkadot/extension-dapp';
import { arrayCollection, collectionsAttributes, instancesAttributes } from './dataInfo';
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

export const getSingleCollection = async (id, api) => {
  const collection = await api.query.uniques.class(id);
  const creator = collection.toHuman() && collection.toHuman().owner;
  return creator;
};

export const getAllCollections = async (api) => {
  try {
    let allCollections = Promise.all(
      arrayCollection.map(async (id) => {
        const collection = await api.query.uniques.class(id);
        const owner = collection.toHuman() && collection.toHuman().owner;
        const tempName = await api.query.uniques.attribute(id, null, collectionsAttributes[0]);
        const name = (tempName.toHuman() && tempName.toHuman()[0]) || 'No Name';
        return { owner, name };
      })
    );
    return allCollections;
  } catch (e) {
    return;
  }
};

export const getAllAssets = async (api, id) => {
  try {
    const collection = await api.query.uniques.class(id);
    const instancesNumber = collection.toHuman() && collection.toHuman().instances;
    let instancesArray = Array.from(Array(parseInt(instancesNumber)).keys());
    let allInstances = Promise.all(
      instancesArray.map(async (instanceId) => {
        const instance = await api.query.uniques.asset(id, instanceId);
        const owner = (instance.toHuman() && instance.toHuman().owner) || '???';
        const tempName = await api.query.uniques.attribute(id, instanceId, instancesAttributes[0]);
        const name = (tempName.toHuman() && tempName.toHuman()[0]) || 'Not Named';
        const tempColor = await api.query.uniques.attribute(id, instanceId, instancesAttributes[1]);
        const color = (tempColor.toHuman() && tempColor.toHuman()[0]) || 'No Color';
        const tempType = await api.query.uniques.attribute(id, instanceId, instancesAttributes[2]);
        const type = (tempType.toHuman() && tempType.toHuman()[0]) || 'No Type';
        return { owner, name, color, type };
      })
    );
    return allInstances;
  } catch (e) {
    return;
  }
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
