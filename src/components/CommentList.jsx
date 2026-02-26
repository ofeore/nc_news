import { useState, useEffect } from "react";
import defaultAvatar from "../assets/default-avatar.jpg";

function CommentList({ article_id }) {
  const [articleComments, setArticleComments] = useState([]);
  const [users, setUsers] = useState(null);

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
    return <h2>Comments loading...</h2>;

  function getUserImgUrl(users, author) {
    const user = users.find((u) => u.username === author);

    if (!user) return defaultAvatar;

    if (user.username === "happyamy2016") {
      return defaultAvatar;
    }
    return user ? user.avatar_url : "";
  }

  return (
    <div className="comments-grid">
      <h2 className="comments-title">Comments</h2>
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
          <p className="comment-votes">Votes: {comment.votes}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
