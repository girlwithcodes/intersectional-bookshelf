import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL, config } from '../services';
import AddComment from './AddComment';
import '../styles/BookDetail.css';
import { list } from 'postcss';

function BookDetail(props) {
  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);
  const [toggleFectch, setToggleFetch] = useState(false);
  const params = useParams();
  const bookID = params.id;
  console.log(bookID);

  useEffect(()=>{
    
    const fetchReviews = async() => {
      const query = { filterByFormula: `FIND("${bookID}", ARRAYJOIN({books})) > 0` };
      const url = `${baseURL}/reviews/?${query}`;
      const resp = await axios.get(url, config);
      console.log(resp.data.records);
      setReviews(resp.data.records);
    }

    const fetchBook = async() => {
      const url = `${baseURL}/books/${bookID}`;
      const resp = await axios.get(url, config);
      setBook(resp.data);
      fetchReviews();
    }
    
    fetchBook();
  },[toggleFectch]);

  const createTagList = (typeOfTag) => {
    switch(typeOfTag) {
      case "author":
        return (
          <ul className="book-tag-display-list">
            <span>author representation tags: </span>
            {book.fields.authorTagList.map((tag) => (
              <li key={book.fields.authorTagList.indexOf(tag)}className="author-tag-item">
                {tag} 
              </li>
            ))}
          </ul>
        )

      break;
      case "rep":
        return (
          <ul className="book-tag-display-list">
            <span>representation tags: </span>
            {book.fields.repTagList.map((tag) => (
              <li key={book.fields.repTagList.indexOf(tag)}className="rep-tag-item">
                {tag} 
              </li>
            ))}
          </ul>
        )
      break;

      case "theme":
        const themeTagList = book.fields.themeTags.split(",");
        return (
          <ul className="book-tag-display-list">
            <span>theme and topic tags: </span>
            {themeTagList.map((tag) => (
              <li key={themeTagList.indexOf(tag)}className="theme-tag-item">
                {tag} 
              </li>
            ))}
          </ul>
        )
        break;

        case "trigger":
        const triggerWarningList = book.fields.themeTags.split(",");
        return (
          <ul className="book-tag-display-list">
            <span>theme and topic tags: </span>
            {themeTagList.map((tag) => (
              <li key={themeTagList.indexOf(tag)}className="theme-tag-item">
                {tag} 
              </li>
            ))}
          </ul>
        )
        break;

    }  
  }

  const listReviews = () => {
    if(reviews && reviews.length!==0){
      return (
        <section id="ratings-reviews-section">
          {reviews.map((review)=>(
            <article className = "review">
              <p><img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className="review-profile-pic"/>{review.fields.author}</p>
              <p><span>Representation Rating: {review.fields.repRating} / 5</span>
              <span>Overall Rating: {review.fields.enjoymentRating} / 5</span></p>
              <p>{review.fields.comment}</p>
            </article>
          ))}

        </section>
      );
    }
    else {
      return (
        <h3>No Reviews Found</h3>
      );
    } 
  }
  

  if(book && Object.keys(book).length!==0){
    return (
      <main>
        <h3>{book.fields.title}<span id="author-name-span"> by {book.fields.author}</span></h3>
        <div className="book-image-tag-div">
          <img src={book.fields.imageURL} id ="book-cover-img" alt={`${book.fields.title} front cover image`}/>
          <div className="book-description-div" id="book-description">
          <p>{book.fields.description}</p>
          </div>
        </div>
  
        <div id="rep-author-tag-div">
            {createTagList("author")}
            {createTagList("rep")}
            {createTagList("theme")}
        </div>

        <div id="comment-form-div">
          <AddComment setToggleFetch={setToggleFetch} bookID = {bookID}/>
        </div>

        <div id="review-list-div">
          <h3>Reader Reviews</h3>
          {listReviews()}
        </div>
        
      </main>
    )
  } else {
    return (
      <h3>Loading...</h3>
    )
  }
  
}
export default BookDetail;