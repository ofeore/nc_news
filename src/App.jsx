import Header from "./components/Header";
import HomePage from "./components/HomePage";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main className="page">
        <HomePage />
      </main>
    </>
  );
}

export default App;

// To-do:

// Error handling and first route.
