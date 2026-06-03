import Header from '../components/Header'
import Footer from '../components/Footer'
import BaseLayout from './BaseLayout'

export default function RootLayout({ children }) {
  return (
    <div>
      <Header/>
      <BaseLayout>{children}</BaseLayout>
      <Footer/>
    </div>
  )
}
