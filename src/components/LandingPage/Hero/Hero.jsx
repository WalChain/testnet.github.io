import styles from './Hero.module.scss';
import html from '../../../assets/Hero/index.html';

const Hero = () => {
  const template = { __html: html };
  return (
    <div className={styles.content}>
      <div dangerouslySetInnerHTML={template} />
    </div>
  );
};

export default Hero;
