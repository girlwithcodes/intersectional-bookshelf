import '../styles/AddComment.css';
function AddComment() {
  return (
    <form id="add-comment-form">
      <label htmlFor="comment-author">comment by: </label>
      <input type="text" id="comment-author" required/>
      <label htmlFor="enj-rating">Enjoyment Rating</label>
      <input type="number" id="enj-rating" name="enj-rating" step="0.01" min="0" max="5"/> <span>/5</span>
      <label htmlFor="rep-rating">Representation Rating: </label>
      <input type="number" id="rep-rating" name="enj-rating" step="0.01" min="0" max="5"/> <span>/5</span>
      <div id="comment-input-div">
        <label htmlFor="comment-input">Comment:</label>
        <textarea id="comment-input" rows="6" cols="50"/>
      </div>
    </form>
  )
}
export default AddComment;