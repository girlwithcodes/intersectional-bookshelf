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
  const [toggleFetch, setToggleFetch] = useState(false);
  const params = useParams();
  const bookID = params.id;
  

  useEffect(()=>{
    
    const fetchReviews = async() => {
      if(book) {
        const url = `${baseURL}/reviews/`;
        const resp = await axios.get(url, config);
        setReviews(resp.data.records);
      }
      
    }

    const fetchBook = async() => {
      const url = `${baseURL}/books/${bookID}`;
      const resp = await axios.get(url, config);
      setBook(resp.data);
      
    }
    fetchBook();
    fetchReviews();

  },[props.toggleFetch]);

  const createTagList = (typeOfTag) => {
    switch(typeOfTag) {
      case "author":
        const authorTags = book.fields.authorTagList;
        if(authorTags && authorTags.length!==0) {
          return (
            <ul className="book-tag-display-list">
              <span>author representation tags: </span>
              {authorTags.map((tag) => (
                <li key={authorTags.indexOf(tag)}className="display-tag-item">
                  {tag} 
                </li>
              ))}
            </ul>
          )
        } else {
          return (
            <ul className="book-tag-display-list"> 
              <span>author representation tags: </span>
              <li>none found</li>
            </ul>
          )
        }
      break;
      case "rep":
        const repTags = book.fields.repTagList;
        if(repTags && repTags.length!==0) {
          return (
            <ul className="book-tag-display-list">
              <span>representation tags: </span>
              {repTags.map((tag) => (
                <li key={repTags.indexOf(tag)}className="display-tag-item">
                  {tag} 
                </li>
              ))}
            </ul>
          )
        } else {
          return (
            <ul className="book-tag-display-list"> 
            <span>representation tags: </span>
            <li>none found</li>
          </ul>
          )
        }
      break;

      case "theme":
        if(book.fields.themeTags && book.fields.themeTags.length!==0) {
          const themeTags = book.fields.themeTags.split(", ");
          return (
            <ul className="book-tag-display-list">
              <span>theme and topic tags: </span>
              {themeTags.map((tag) => (
                <li key={themeTags.indexOf(tag)}className="display-tag-item">
                  {tag} 
                </li>
              ))}
            </ul>
          )
        } else {
          return (
            <ul className="book-tag-display-list"> 
              <span>theme and topic tags: </span>
              <li>none found</li>
            </ul>
          )
        }
        break;

        case "trigger":
          if(book.fields.triggerWarnings && book.fields.triggerWarnings.length!==0) {
            const triggerWarnings = book.fields.triggerWarnings.split(", ");
            return (
              <ul className="book-tag-display-list">
                <span>trigger warnings:</span>
                {triggerWarnings.map((tag) => (
                  <li key={triggerWarnings.indexOf(tag)}className="display-tag-item">
                    {tag} 
                  </li>
                ))}
              </ul>
            );
          } else {
            return (
              <ul className="book-tag-display-list"> 
              <span>trigger warnings: </span>
              <li> none found</li>
            </ul>
            )
          }
        break;

    }  
  }

  const listReviews = () => {
    if(book.fields.reviews && book.fields.reviews.length!==0 && reviews && reviews.length!==0){
      const reviewList = reviews.filter((review)=>book.fields.reviews.includes(review.id));
      console.log(reviewList);
      // const reviewList = book.fields.reviews;
      return (
        <section id="ratings-reviews-section">
          {reviewList.map((review)=>(
            <article key={review.id} className = "review">
              <section className="reviewer-info-section">
                <p className="reviewer-pic-name"><img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className="review-profile-pic"/>{review.fields.author}</p>
                <section className="review-ratings-section">
                  <p>Representation Rating: {review.fields.repRating} / 5</p>
                  <p>Overall Rating: {review.fields.enjoymentRating} / 5</p>
                </section>
              </section>

              <section className="review-comment-section">
                <p>{review.fields.comment}</p>
              </section>
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
      <main id="book-detail-main">
        <h3>{book.fields.title}<span id="author-name-span"> by {book.fields.author}</span></h3>
        <div className="book-image-desc-div">
          <img src={book.fields.imageURL} id ="book-cover-img" alt={`${book.fields.title} front cover image`}/>
          <div className="book-description-div" id="book-description">
          <p>{book.fields.description}</p>
          </div>
        </div>
  
        <div id="rep-author-tag-div">
            {createTagList("author")}
            {createTagList("rep")}
            {createTagList("theme")}
            {createTagList("trigger")}
        </div>

        <div id="comment-form-div">
          <h3>Add Comment</h3>
          <AddComment setToggleFetch={props.setToggleFetch} bookID = {bookID}/>
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