import React from 'react';
import AnchorLink from "../Atoms/AnchorLink/AnchorLink";
import styles from './Layout.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <AnchorLink href={'/api/auth/logout'} variant={'secondary'}>Log out</AnchorLink>
    </footer>
  )
};