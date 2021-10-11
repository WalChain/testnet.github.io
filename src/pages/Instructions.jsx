import Introduction from '../components/Instructions/Introduction/Introduction';
import Getstarted from '../components/Instructions/GetStarted/GetStarted';
import { useRef } from 'react';

const Instructions = () => {
  const getStartedRef = useRef(null);
  const scrollIntoComponent = () => {
    getStartedRef.current.scrollIntoView({ block: 'center' });
  };
  return (
    <>
      <Introduction scroll={scrollIntoComponent} />
      <Getstarted refProp={getStartedRef} />
    </>
  );
};

export default Instructions;
