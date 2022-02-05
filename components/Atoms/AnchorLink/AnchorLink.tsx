import React from 'react';
import Link from "next/link";
import styles from './AnchorLink.module.scss';

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export default function AnchorLink({ href, children, variant }: Props) {
  if (!href || !children) return null;

  return (
    <Link href={href}>
      <a className={`${styles.btn} ${styles[variant || '']}`}>{ children }</a>
    </Link>
  )
}