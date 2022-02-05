import React, {ReactNode} from 'react';
import Head from "next/head";

type Props = {
    children: ReactNode;
};

export default function Layout({children}: Props) {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                { children }
            </main>
        </div>
    )
}