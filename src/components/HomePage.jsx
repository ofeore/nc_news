import { useState, useEffect } from "react";
import ArticleList from "./ArticleList";

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    fetch("https://back-end-nc-news-71fp.onrender.com/api/articles")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setArticles(data.articles);
      });
  }, []);

  return (
    <>
      <select>
        <option value="All articles">All articles</option>
        <option value="My articles">My articles</option>
        <option value="Latest articles">Latest articles</option>
      </select>
      <ArticleList articles={articles} />
    </>
  );
}

export default HomePage;
