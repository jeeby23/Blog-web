import RootLayout from "../Layout/RootLayout"
import Hero from "../components/project/hero"
import ProjectCards from "../components/project/projectCards"

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