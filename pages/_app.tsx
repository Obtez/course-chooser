import Layout from "../components/Layout/Layout";
import {UserProvider} from "@auth0/nextjs-auth0";
import {Provider} from "react-redux";
import {store} from "../store/store";
import '../styles/globals.scss'
import type {AppProps} from 'next/app'

function App({Component, pageProps}: AppProps) {
  const {user} = pageProps;

  return (
    <Provider store={store}>
      <UserProvider user={user}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </Provider>
  )
}

export default App
