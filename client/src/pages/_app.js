import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.scss'
import '@/styles/mystyle.scss'
import '@/styles/index.scss'
import { Footer } from '@/component/footer';
import { Header } from '@/component/header';
import 'bootstrap/dist/css/bootstrap.min.css'
import {sessionV, userData } from '../store/authuser';

export default function App({ Component, pageProps: { ...pageProps }, }) {

  return <div className='body'>
      <Header data={userData} />
      <Component {...pageProps} />
      <Footer />
      </div>

}
