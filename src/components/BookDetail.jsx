import { useParams } from 'react-router-dom';
import AddComment from './AddComment';
import '../styles/BookDetail.css';

function BookDetail(props) {
  const params = useParams();
  const bookID = params.id;
  const book = props.bookList.find((book)=> book.id===bookID);

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
    }  
  }

  if(book){
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
        </div>

        <div id="comment-form-div">
          <AddComment />
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