import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import dynamic from 'next/dynamic'
import 'antd/dist/antd.css'
import Layout from "../components/Layout";
import store from '../redux/store';
import {Provider} from 'react-redux';
import loader from "../utils/loading.json";
import { useRouter } from "next/router";
import 'devextreme/dist/css/dx.light.css';
import Cookies from 'js-cookie'


export default function App({ Component, pageProps }) {

  let role = Cookies.get('role')
  const router = useRouter();
  let allowed = true
  let sadRoutes = []
  if (role == "SAD"  && router.pathname.includes("/employee")) {
    allowed = false;
  }

  // let Home = () => {
  //   return 'Not allowed'
  // }

  const ComponentToRender = allowed ? Component : Home; 

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

