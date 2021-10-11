import Hero from '../components/LandingPage/Hero/Hero';
import Miw from '../components/LandingPage/MiddleSection/Miw';
import Polka from '../components/LandingPage/Polka/Polka';
// import Contributors from '../components/LandingPage/Contributors/Contributors';

const LandingPage = () => {
  window.onpopstate = (e) => {
    e.state === null && window.location.reload(false);
  };
  return (
    <>
      <Hero />
      <Miw />
      <Polka />
      {/* <Contributors /> */}
    </>
  );
};

export default LandingPage;
