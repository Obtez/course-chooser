import Layout from "../components/Layout";
import { UserProvider } from "@auth0/nextjs-auth0";
import '../styles/globals.scss'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
      <UserProvider>
        <Layout>
            <Component {...pageProps} />
        </Layout>
      </UserProvider>
  )
}
export default App
