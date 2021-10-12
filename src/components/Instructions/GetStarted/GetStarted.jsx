import styles from './GetStarted.module.scss';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Steps from './Steps/Steps';

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
          <Button
            className={styles.back}
            variant='contained'
            onClick={() => change('back')}
          >
            BACK
          </Button>
          <Button
            className={styles.next}
            variant='contained'
            color='success'
            onClick={() => change('next')}
          >
            NEXT
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Getstarted;
