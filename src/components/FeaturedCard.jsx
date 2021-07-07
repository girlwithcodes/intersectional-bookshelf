import { Link } from 'react-router-dom';
function FeaturedCard(props) {

  const createTagList = (book, typeOfTag) => {
    switch(typeOfTag) {
      case "author":
        if(book.fields.authorTagList && book.fields.authorTagList.length!==0) {
          return (
            <ul className="book-tag-display-list">
              <span>author representation tags: </span>
              {book.fields.authorTagList.map((tag) => (
                <li key={book.fields.authorTagList.indexOf(tag)}className="results-display-tag-item">
                {tag} 
                </li>
              ))}
            </ul>
          )
        } else {
          return (
            <span>author representation tags: none found</span>
          )
        }

      break;
      case "rep":
        if(book.fields.repTagList && book.fields.repTagList.length!==0) {
          return (
            <ul className="book-tag-display-list">
              <span>representation tags: </span>
              {book.fields.repTagList.map((tag) => (
                <li key={book.fields.repTagList.indexOf(tag)}className="results-display-tag-item">
                {tag} 
                </li>
              ))}
            </ul>
          )
        } else {
          return (
            <span>representation tags: none found</span>
          )
        }
      break;
    }
    
  }
  if(props.book && Object.keys(props.book).length!==0) {
    return (
      <Link to={`/bookDetail/${props.book.id}`} >
        <div id="current-featured-card">
          <img src={props.book.fields.imageURL} id="current-featured-cover"/>
          <div id="featured-book-info-div">
            <h4>{props.book.fields.title}</h4>
            <p>by {props.book.fields.author}</p>
            <div>
              {createTagList(props.book, "author")}
              {createTagList(props.book, "rep")}
            </div>
          </div>
        </div>
      </Link>
    );
    
  } else {
    return (
      <p>Loading...</p>
    );
    
  }
}

export default FeaturedCard;