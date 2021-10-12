import styles from './GetStarted.module.scss';
import { useState } from 'react';
import Steps from './Steps/Steps';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const Getstarted = ({ refProp }) => {
  const [steps, setsteps] = useState(1);
  const [position, setposition] = useState('');
  const count = 6;
  let countSteps = Array.from(Array(count).keys());
  countSteps.push(count);
  countSteps.shift();

  const change = (string) => {
    if (string === 'back') {
      setposition(string);
      steps === countSteps[0] ? setsteps(countSteps[0]) : setsteps(steps - 1);
    }
    if (string === 'next') {
      setposition(string);
      steps === count ? setsteps(count) : setsteps(steps + 1);
    }
  };
  return (
    <div ref={refProp}>
      <div className={styles.container}>
        <Steps
          position={position}
          change={change}
          steps={steps}
          setsteps={setsteps}
          countSteps={countSteps}
        />
        <div className={styles.buttons}>
          <div className={styles.back} onClick={() => change('back')}>
            <div className={styles.icon}>
              <NavigateBeforeIcon />
            </div>
            <div>PRECEDENT</div>
          </div>
          <div className={styles.next} onClick={() => change('next')}>
            <div>SUIVANT</div>
            <div className={styles.icon}>
              <NavigateNextIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Getstarted;
