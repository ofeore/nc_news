import { useState, useEffect } from "react";

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

  return (
    <div>
      <h1>Articles</h1>
      {articles.map((article) => (
        <div key={article.article_id}>
          <h3>{article.title}</h3>
          <p>{article.author}</p>
          <p>{article.created_at}</p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
