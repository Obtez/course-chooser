import React from 'react';
import styles from './Button.module.scss';

interface Props {
  variant?: string;
  children: React.ReactNode;
  clickHandler?: () => void;
}

export default function Button ({variant = '', children, clickHandler}: Props) {
  return (
    <button type="button" className={`${styles.btn} ${styles[variant || '']}`}>{children}</button>
  )
}