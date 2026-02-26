import Header from "./components/Header";
import HomePage from "./components/HomePage";
import ArticlePage from "./components/ArticlePage";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Header />

      <main className="page">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/topics/:topic" element={<HomePage />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
