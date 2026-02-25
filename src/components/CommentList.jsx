import { useState, useEffect } from "react";

function CommentList({ article_id }) {
  const [articleComments, setArticleComments] = useState([]);
  useEffect(() => {
    async function fetchArticleComments() {
      const res = await fetch(
        `https://back-end-nc-news-71fp.onrender.com/api/articles/${article_id}/comments`,
      );

      const data = await res.json();
      console.log(data);
      setArticleComments(data.comments);
    }

    fetchArticleComments();
  }, [article_id]);

  if (!articleComments) return <h2>Comments loading...</h2>;

  return (
    <div>
      {articleComments.map((comment) => (
        <div key={comment.comment_id}>{comment.body}</div>
      ))}
    </div>
  );
}
export default CommentList;
