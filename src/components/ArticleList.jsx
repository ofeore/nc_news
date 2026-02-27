import { Link } from "react-router-dom";

function ArticleList({ articles }) {
  function convertDate(dateString) {
    let isoDate = new Date(dateString);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    let formattedDate = isoDate.toLocaleDateString("en-GB", options);
    return formattedDate;
  }

  return (
    <div className="article-grid">
      {articles.map((article) => (
        <div className="article-card" key={article.article_id}>
          <div className="title-container">
            <Link to={`/articles/${article.article_id}`}>
              <h3 className="article-title">{article.title}</h3>
            </Link>
            <p className="date">{convertDate(article.created_at)}</p>
          </div>
          <p className="article-author">By {article.author}</p>
          <img className="images" src={article.article_img_url} />

          <div className="votes-div">
            <p className="votes">Votes: {article.votes}</p>
          </div>

          <div className="article-meta">
            <p className="topic-name">
              {article.topic[0].toUpperCase() + article.topic.slice(1)}
            </p>
            <p className="comment-count">Comments: {article.comment_count}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ArticleList;
