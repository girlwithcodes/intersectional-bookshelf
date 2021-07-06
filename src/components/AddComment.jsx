
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { baseURL, config } from '../services';
import '../styles/AddComment.css';

function AddComment(props) {
  const [books, setBooks] = useState([props.bookID]);
  const [author, setAuthor] = useState("");
  const [repRating, setRepRating] = useState();
  const [enjoymentRating, setEnjoymentRating] = useState();
  const [comment, setComment] = useState("");
  const history = useHistory();

  const submitReview = async(e) => {
    e.preventDefault();
    const newReview = {
      author,
      repRating,
      enjoymentRating,
      comment,
      books
    }
    const url = `${baseURL}/reviews`;
    await axios.post(url, { fields: newReview }, config);
    props.setToggleFetch((curr)=>!curr);
    setAuthor("");
    setRepRating();
    setEnjoymentRating();
    setComment("");
  }

  return (
    <form id="add-comment-form" onSubmit={(e)=>submitReview(e)}>

      <div id="review-header">
        <div>
          <label htmlFor="comment-author">comment by: </label>
          <input type="text" id="comment-author" required 
          value={author} onChange={(e)=> setAuthor(e.target.value)}/>
        </div>

        <div>
          <label htmlFor="enj-rating">Enjoyment Rating</label>
          <input type="number" id="enj-rating" name="enj-rating" 
          step="0.1" min="0" max="5" value={enjoymentRating}
          onChange={(e)=>setEnjoymentRating(e.target.valueAsNumber)}/> <span>/5</span>
        </div>

        <div>
          <label htmlFor="rep-rating">Representation Rating: </label>
          <input type="number" id="rep-rating" name="enj-rating" 
          step="0.1" min="0" max="5" value={repRating}
          onChange={(e)=>setRepRating(e.target.valueAsNumber)}/> <span>/5</span>
        </div>
      </div>

      <div id="comment-input-div">
        <label htmlFor="comment-input">Comment:</label>
        <textarea id="comment-input" rows="6" value={comment}
        onChange={(e)=>setComment(e.target.value)}/>
      </div>
      <button type="submit">Post Review</button>
    </form>
  )
}
export default AddComment;