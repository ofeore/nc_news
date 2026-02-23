import { useState, useEffect } from "react";
import ArticleList from "./ArticleList";

function HomePage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("https://back-end-nc-news-71fp.onrender.com/api/articles")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setArticles(data.articles);
      });
  }, []);

  return <ArticleList articles={articles} />;
}

export default HomePage;
