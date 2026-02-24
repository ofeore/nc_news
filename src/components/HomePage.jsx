import { useState, useEffect } from "react";
import ArticleList from "./ArticleList";

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState("All articles");

  useEffect(() => {
    fetch("https://back-end-nc-news-71fp.onrender.com/api/articles")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setArticles(data.articles);
      });
  }, []);

  const LOGGED_ON_USER = "grumpy19";

  let articlesShown = [...articles];

  if (filter === "My articles") {
    articlesShown = articles.filter((a) => a.author === LOGGED_ON_USER);
  }

  if (filter === "Coding") {
    articlesShown = articles.filter((a) => a.topic === "coding");
  }

  return (
    <>
      <div className="select-container">
        <label id="select-label">
          Filter by:
          <select
            className="select-box"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All articles">All articles</option>
            <option value="My articles">My articles</option>
            <option value="Coding">Coding topic</option>
          </select>
        </label>
      </div>
      <ArticleList articles={articlesShown} />
    </>
  );
}

export default HomePage;
