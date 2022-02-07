import React, {useState} from 'react';
import styles from './Modal.module.scss';

export default function PriorityModal(props: any) {
  const [topPriority, setTopPriority] = useState<any>();
  const [midPriority, setMidPriority] = useState<any>();
  const [lowPriority, setLowPriority] = useState<any>();

  const newPriority = props.newPriority;

  async function overwritePriority(oldCourseID: string, newCourseID: string) {
    console.log('old', oldCourseID);
    console.log('new', newCourseID);
    return null
  }

  async function updatePriorities() {
    console.log('top', topPriority);
    console.log('mid', midPriority);
    console.log('low', lowPriority);
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal__header}>
        <h2 className={styles.modal__title}>Your Courses</h2>
      </div>
      <div className={styles.modal__body}>
        <ol className={styles.modal__list}>
          <li className={styles.modal__list__item}>
            <span>Priority:</span>
            <span>{ topPriority || '' }</span>
            <button type="button" onClick={() => overwritePriority(topPriority, newPriority)}>Overwrite</button>
          </li>
          <li className={styles.modal__list__item}>
            <span>Priority:</span>
            <span>{ midPriority || '' }</span>
            <button type="button" onClick={() => overwritePriority(midPriority, newPriority)}>Overwrite</button>
          </li>
          <li className={styles.modal__list__item}>
            <span>Priority:</span>
            <span>{ lowPriority || '' }</span>
            <button type="button" onClick={() => overwritePriority(lowPriority, newPriority)}>Overwrite</button>
          </li>
        </ol>
      </div>
      <div className={styles.modal__footer}>
        <button className={styles.modal__saveBtn} type="button" onClick={updatePriorities}>Save</button>
        <button className={styles.modal__saveBtn} type="button" onClick={props.toggleModal}>Close without Saving</button>
      </div>
    </div>
  )
}