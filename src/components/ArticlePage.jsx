import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa6";
import CommentList from "./CommentList";
import NotFound from "./NotFound";

function ArticlePage() {
  const [currentArticle, setCurrentArticle] = useState(null);
  const [votes, setVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [isUpvoteClicked, setIsUpvoteClicked] = useState(false);
  const [isDownvoteClicked, setIsDownvoteClicked] = useState(false);
  const { article_id } = useParams();

  useEffect(() => {
    async function fetchSingleArticle() {
      setIsLoading(true);
      setErr(null);

      try {
        const res = await fetch(
          `https://back-end-nc-news-71fp.onrender.com/api/articles/${article_id}`,
        );

        if (!res.ok) {
          throw new Error("Failed to load article");
        }

        const data = await res.json();
        setCurrentArticle(data.article);
      } catch (err) {
        setErr(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSingleArticle();
  }, [article_id]);

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader" />
      </div>
    );
  }

  if (!currentArticle) {
    return <NotFound />;
  }

  async function updateCount(num) {
    setVotes((curr) => curr + num);

    if (num === 1) {
      setIsUpvoteClicked(true);
      setIsDownvoteClicked(false);
    } else if (num === -1) {
      setIsUpvoteClicked(false);
      setIsDownvoteClicked(true);
    }

    try {
      const res = await fetch(
        `https://back-end-nc-news-71fp.onrender.com/api/articles/${article_id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ increment_votes: num }),
        },
      );
      if (!res.ok) throw new Error("Vote failed");
    } catch (err) {
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
                onClick={(event) => updateCount(1, event)}
                disabled={isUpvoteClicked ? true : false}
              >
                <FaThumbsUp />
              </button>

              <button
                className="vote-btn downvote"
                onClick={(event) => updateCount(-1, event)}
                disabled={isDownvoteClicked ? true : false}
              >
                <FaThumbsDown />
              </button>
            </div>
          </div>
        </article>
      </div>
      {err && <NotFound />}
      <CommentList article_id={article_id} />
      {isLoading && (
        <div className="loader-container">
          <p className="loader"></p>
        </div>
      )}
    </>
  );
}

export default ArticlePage;
