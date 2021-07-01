import { useParams } from 'react-router-dom';
import '../styles/BookDetail.css';

function BookDetail(props) {
  const params = useParams();
  const bookID = params.id;
  const book = props.bookList.find((book)=> book.id===bookID);

  return (
    <main>
      <h3>{book.fields.title}<span> by {book.fields.author}</span></h3>
      <img src={book.fields.imageURL} alt={`${book.fields.title} front cover image`}/>
      <div className="book-description-div" id="book-description">
        <p>{book.fields.description}</p>
      </div>
    </main>
    
  )
}
export default BookDetail;