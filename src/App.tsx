import { Header } from './components/Header'
import { HomeHero } from './components/HomeHero'
import { Solutions } from './components/Solutions'
import { ProcessSteps } from './components/ProcessSteps'
import { Partners } from './components/Partners'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { useReveal } from './motion/useReveal'

function App() {
  useReveal()

  return (
    <>
      <Header />
      <main>
        <HomeHero />
        <Solutions />
        <ProcessSteps />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
