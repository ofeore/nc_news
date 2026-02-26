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
      <div>
        <h2>{currentArticle.title}</h2>
        <img src={`${currentArticle.article_img_url}`} />
        <p>{currentArticle.body}</p>
        <p>Votes: {currentArticle.votes + votes}</p>
        <button
          onClick={() => {
            updateCount(1);
          }}
        >
          Upvote
        </button>
        <button
          onClick={() => {
            updateCount(-1);
          }}
        >
          Downvote
        </button>
      </div>
      <CommentList article_id={article_id} />
    </>
  );
}

export default ArticlePage;
