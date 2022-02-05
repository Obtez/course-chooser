import React from 'react';
import Link from 'next/link';
import styles from './Layout.module.scss';
import AnchorLink from "../Atoms/AnchorLink/AnchorLink";

export default function Navbar() {
  return (<div className={styles.navbar__wrapper}>
    <nav>
      <div className={styles.navbar}>
        <Link href={'/'}>
          <a className={styles.logo}>Courses</a>
        </Link>
        <ul className={styles.navbar__menu}>
          <li>
            <AnchorLink href={'/'}>Home</AnchorLink>
          </li>

          <li>
            <AnchorLink href={'/courses'}>Courses</AnchorLink>
          </li>

          <li>
            <AnchorLink href={'/profile'}>Profile</AnchorLink>
          </li>
        </ul>
      </div>
    </nav>
  </div>)
}