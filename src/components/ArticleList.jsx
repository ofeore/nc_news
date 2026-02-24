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
            <h3 className="article-title">{article.title}</h3>
            <p className="date">{convertDate(article.created_at)}</p>
          </div>
          <p className="article-author">By {article.author}</p>
          <img className="images" src={article.article_img_url} />

          <p className="votes">Votes: {article.votes}</p>
          <p className="topic-name">
            {article.topic[0].toUpperCase() + article.topic.slice(1)}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ArticleList;
