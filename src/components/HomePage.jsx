import { useState, useEffect } from "react";
import ArticleList from "./ArticleList";

function HomePage() {
  const [articles, setArticles] = useState(null);
  const [filter, setFilter] = useState("All articles");

  useEffect(() => {
    fetch("https://back-end-nc-news-71fp.onrender.com/api/articles")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setArticles(data.articles);
      });
  }, []);

  if (!articles) return <h2>Loading...</h2>;

  const LOGGED_ON_USER = "grumpy19";

  let articlesShown = [...articles];

  if (filter === "My articles") {
    articlesShown = articles.filter((a) => a.author === LOGGED_ON_USER);
  }

  if (filter === "Coding") {
    articlesShown = articles.filter((a) => a.topic === "coding");
  }

  if (filter === "Cooking") {
    articlesShown = articles.filter((a) => a.topic === "cooking");
  }

  if (filter === "Football") {
    articlesShown = articles.filter((a) => a.topic === "football");
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
            <option value="Coding">Topic: Coding</option>
            <option value="Cooking">Topic: Cooking</option>
            <option value="Football">Topic: Football</option>
          </select>
        </label>
      </div>
      <ArticleList articles={articlesShown} />
    </>
  );
}

export default HomePage;
