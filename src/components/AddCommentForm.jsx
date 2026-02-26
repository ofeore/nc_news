import { useState } from "react";

function AddCommentForm({ article_id, setClicked, addCommentToList }) {
  const [inputText, setInputText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!inputText.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(
        `https://back-end-nc-news-71fp.onrender.com/api/articles/${article_id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "grumpy19",
            body: inputText,
          }),
        },
      );

      if (!res.ok) throw new Error("Failed to post comment");

      const data = await res.json();

      addCommentToList(data.comment);

      setInputText("");
      setClicked(false);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-comment-form">
      <div className="add-comment-header">
        <h3 className="add-comment-title">Add a comment</h3>
        <button
          type="button"
          className="close-comment-btn"
          onClick={() => setClicked(false)}
          disabled={isSubmitting}
        >
          ✕
        </button>
      </div>

      <textarea
        className="add-comment-textarea"
        placeholder="Write your comment here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isSubmitting}
        rows={4}
      />

      {error && <p className="comment-error">{error}</p>}

      <button
        type="submit"
        className="submit-comment-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Post Comment"}
      </button>
    </form>
  );
}

export default AddCommentForm;
