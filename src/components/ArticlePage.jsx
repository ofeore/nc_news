import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";

function ArticlePage() {
  const [currentArticle, setCurrentArticle] = useState(null);
  const [votes, setVotes] = useState(0);
  const { article_id } = useParams();

  useEffect(() => {
    async function fetchSingleArticle() {
      const res = await fetch(
        `https://back-end-nc-news-71fp.onrender.com/api/articles/${article_id}`,
      );

      const data = await res.json();
      console.log(data);
      setCurrentArticle(data.article);
    }

    fetchSingleArticle();
  }, [article_id]);

  if (!currentArticle) return <h2>Loading...</h2>;
  console.log(currentArticle);

  async function updateCount(num) {
    // OPTIMISTIC RENDERING - Remove vote if fails.

    setVotes((curr) => curr + num);

    try {
      const res = await fetch(
        `https://back-end-nc-news-71fp.onrender.com/api/articles/${article_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ increment_votes: num }),
        },
      );
      if (!res.ok) throw new Error("Vote failed"); // if backend fails.
    } catch (err) {
      // err if something like user internet fails.
      setVotes((curr) => curr - num);
      console.error(err);
    }
  }

  return (
    <>
      <div className="single-article-container">
        <article className="single-article-card">
          <h1 className="single-article-title">{currentArticle.title}</h1>

          <p className="single-article-meta">
            By {currentArticle.author} • {currentArticle.topic}
          </p>

          <img
            className="single-article-image"
            src={currentArticle.article_img_url}
            alt={currentArticle.title}
          />

          <p className="single-article-body">{currentArticle.body}</p>

          <div className="vote-section">
            <p className="vote-count">Votes: {currentArticle.votes + votes}</p>

            <div className="vote-buttons">
              <button
                className="vote-btn upvote"
                onClick={() => updateCount(1)}
              >
                ↑ Upvote
              </button>

              <button
                className="vote-btn downvote"
                onClick={() => updateCount(-1)}
              >
                ↓ Downvote
              </button>
            </div>
          </div>
        </article>
      </div>

      <CommentList article_id={article_id} />
    </>
  );
}

export default ArticlePage;
