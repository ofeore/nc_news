import { useState, useEffect } from "react";
import AddCommentForm from "./AddCommentForm";
import defaultAvatar from "../assets/default-avatar.jpg";

function CommentList({ article_id }) {
  const [articleComments, setArticleComments] = useState([]);
  const [users, setUsers] = useState(null);
  const [isAddCommentClicked, setIsAddCommentClicked] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    async function fetchArticleComments() {
      const res = await fetch(
        `https://back-end-nc-news-71fp.onrender.com/api/articles/${article_id}/comments`,
      );
      const data = await res.json();
      setArticleComments(data.comments);
    }
    fetchArticleComments();
  }, [article_id]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch(
        `https://back-end-nc-news-71fp.onrender.com/api/users`,
      );
      const data = await res.json();
      setUsers(data.users);
    }
    fetchUsers();
  }, []);

  if (!users || articleComments.length === 0)
    return <h2 className="comments-loading-msg">Comments loading...</h2>;

  function getUserImgUrl(users, author) {
    const user = users.find((u) => u.username === author);

    if (!user) return defaultAvatar;

    if (user.username === "happyamy2016") {
      return defaultAvatar;
    }
    return user ? user.avatar_url : "";
  }

  function addCommentToList(newComment) {
    setArticleComments((current) => [newComment, ...current]);
  }

  const loggedInUser = "grumpy19";

  async function handleDelete(comment_id) {
    const previousComments = articleComments;
    setDeletingId(comment_id);

    setArticleComments((curr) =>
      curr.filter((c) => c.comment_id !== comment_id),
    );

    try {
      const res = await fetch(
        `https://back-end-nc-news-71fp.onrender.com/api/comments/${comment_id}`,
        { method: "DELETE" },
      );

      if (!res.ok) throw new Error("Delete failed");
    } catch (err) {
      setArticleComments(previousComments);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="comments-grid">
      <div className="comments-header">
        <h2 className="comments-title">Comments</h2>

        {!isAddCommentClicked && (
          <button
            className="add-comment-button"
            onClick={() => setIsAddCommentClicked(true)}
          >
            + Add Comment
          </button>
        )}
      </div>

      {isAddCommentClicked && (
        <AddCommentForm
          article_id={article_id}
          setClicked={setIsAddCommentClicked}
          addCommentToList={addCommentToList}
        />
      )}

      <div className="comments-scroll">
        {articleComments.map((comment) => (
          <div className="comment-card" key={comment.comment_id}>
            <div className="comment-card-author-and-avatar-container">
              <img
                className="comment-avatar-img"
                src={getUserImgUrl(users, comment.author)}
                alt=""
              />
              <h4 className="comment-author">{comment.author}</h4>
            </div>
            <p>{comment.body}</p>
            {comment.author === loggedInUser && (
              <button
                className="delete-comment-btn"
                onClick={() => handleDelete(comment.comment_id)}
                disabled={deletingId === comment.comment_id}
              >
                {deletingId === comment.comment_id ? "Deleting..." : "Delete"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentList;
