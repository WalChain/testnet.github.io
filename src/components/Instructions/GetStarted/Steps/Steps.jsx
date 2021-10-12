import { CSSTransition } from 'react-transition-group';
import styles from './Steps.module.scss';
import Content from '../Content/Content';

const Steps = ({ position, steps, countSteps }) => {
  return (
    <>
      {countSteps.map((step) => {
        return (
          <CSSTransition
            key={step}
            in={steps == step}
            timeout={0}
            mountOnEnter={true}
            classNames={{
              enterActive:
                position === 'next'
                  ? styles.nextEnterActive
                  : styles.backEnterActive,
              enterDone:
                position === 'next'
                  ? styles.nextEnterDone
                  : styles.backEnterDone,
              exitActive:
                position === 'next' ? styles.nextExit : styles.backExit,
              exitDone:
                position === 'next'
                  ? styles.nextExitActive
                  : styles.backExitActive,
            }}
          >
            <div className={styles.block}>
              <Content number={step} />
            </div>
          </CSSTransition>
        );
      })}
    </>
  );
};

export default Steps;
