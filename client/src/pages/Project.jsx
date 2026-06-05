import RootLayout from "../Layout/RootLayout"
import Hero from "../components/Project/hero"
import ProjectCards from "../components/Project/projectCards"

export const Project = () => {
  return (
    <section>
      <RootLayout>
        <Hero />
        <ProjectCards />
      </RootLayout>
    </section>
  )
}