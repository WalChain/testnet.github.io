import { useParams } from 'react-router-dom';

const Assetcomponent = () => {
  let { id } = useParams();
  console.log(id);
  return (
    <>
      <h1>asset is working</h1>
    </>
  );
};
export default Assetcomponent;
