import Layout from "../components/Layout/Layout";
import {UserProvider, useUser} from "@auth0/nextjs-auth0";
import '../styles/globals.scss'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  const { user } = pageProps;

  return (
      <UserProvider user={user}>
        <Layout>
            <Component {...pageProps} />
        </Layout>
      </UserProvider>
  )
}
export default App
