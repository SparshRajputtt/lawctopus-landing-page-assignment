import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Course from "./components/Course";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Course />
      </main>
      <Footer />
    </div>
  );
}

export default App;