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
          <h3>{article.title}</h3>
          <p>{article.author}</p>
          <p>{convertDate(article.created_at)}</p>
        </div>
      ))}
    </div>
  );
}

export default ArticleList;
