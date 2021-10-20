import { arrayCollection, collectionsAttributes, instancesAttributes } from './dataInfo';

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
        const identifier = id;
        return { owner, name, identifier };
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
