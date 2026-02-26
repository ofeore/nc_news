import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ArticleList from "./ArticleList";

function HomePage() {
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [articles, setArticles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setIsLoading(true);
    setErr(null);

    let url = `https://back-end-nc-news-71fp.onrender.com/api/articles?sort_by=${sortBy}&order=${order}`;

    if (topic) {
      url += `&topic=${topic}`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load articles");
        return res.json();
      })
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        setErr(error.message);
        setIsLoading(false);
      });
  }, [topic, sortBy, order]);

  function handleSortByChange(e) {
    setSearchParams({ sort_by: e.target.value, order });
  }

  function handleOrderChange(e) {
    setSearchParams({ sort_by: sortBy, order: e.target.value });
  }

  return (
    <>
      <div className="articles-toolbar">
        <h2 className="articles-heading">
          {topic ? `Topic: ${topic}` : "All articles"}
        </h2>

        <div className="sort-controls">
          <label className="sort-label">
            Sort by
            <select
              className="sort-select"
              value={sortBy}
              onChange={handleSortByChange}
            >
              <option value="created_at">Date</option>
              <option value="comment_count">Comment count</option>
              <option value="votes">Votes</option>
            </select>
          </label>

          <label className="sort-label">
            Order
            <select
              className="sort-select"
              value={order}
              onChange={handleOrderChange}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </label>
        </div>
      </div>

      {isLoading && <h2>Loading...</h2>}
      {err && <p>{err}</p>}
      {articles && <ArticleList articles={articles} />}
    </>
  );
}

export default HomePage;
