import React from 'react';
import AnchorLink from "../Atoms/AnchorLink/AnchorLink";
import styles from './Layout.module.scss'


// TODO don't show logout when user is not logged in
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <AnchorLink href={'/api/auth/logout'} variant={'secondary'}>Log out</AnchorLink>
    </footer>
  )
};