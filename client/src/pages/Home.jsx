import RootLayout from "../Layout/RootLayout"
import Hero from '../components/Home/hero'
import RecentPost from '../components/Home/recentPost'
import GridSection from '../components/Home/Grid'
import AllBlogs from '../components/Home/AllBlogs'
const Home = () => {
  return (
    <section>
        <RootLayout>
        <Hero/>
        <RecentPost />
        <GridSection />
        <AllBlogs />
      </RootLayout>
    </section>
  )
}

export default Home