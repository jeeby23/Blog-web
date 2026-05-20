import RootLayout from "../Layout/RootLayout"
import Hero from "../components/About/hero"
import AboutInfo from "../components/About/aboutInfo"


export const About = () => {
  return (
   <section>
    <div>
       <RootLayout>
        <Hero/>
        <AboutInfo/>
        </RootLayout> 
    </div>
   </section>
  )
}
