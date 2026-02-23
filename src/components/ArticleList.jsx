function ArticleList({ articles }) {
  return (
    <div>
      {articles.map((article) => (
        <div key={article.article_id}>
          <h3>{article.title}</h3>
          <p>{article.author}</p>
          <p>{article.created_at}</p>
        </div>
      ))}
    </div>
  );
}

export default ArticleList;
