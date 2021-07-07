import { Link, useParams } from 'react-router-dom';
import '../styles/BrowseAndSearchResults.css';

function BrowseResults(props) {
  const params = useParams();
  const browseByID = params.id;
  const bookList = props.bookList;
  console.log(params);
  const bookMatches = params.tagType==="genre"? bookList.filter((book)=>book.fields.genres.includes(browseByID)) : params.tagType==="repTag" ? bookList.filter((book)=>book.fields.repTags.includes(browseByID)) : bookList.filter((book)=>book.fields.authorTags.includes(browseByID));

  console.log(bookMatches);

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
          );
        } else {
          return (
            <p>author representation tags: none found</p>
          );
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
            <p>representation tags: none found</p>
          )
        }
      break;
    }
    
  }

  return (
    <main className="search-results-main">
      <h2>Browse Results</h2>
      <ul className="book-matches-list">
        {bookMatches.map((book)=>(
          <Link to={`/bookDetail/${book.id}`} key={book.id}>
            <li>
              <div className="book-match-div">
                <img className="results-list-image" src={book.fields.imageURL} />
                <div className="book-result-info-div">
                  <h4>{book.fields.title}</h4>
                  <p>by {book.fields.author}</p>
                    <div>
                      {createTagList(book, "author")}
                      {createTagList(book, "rep")}
                    </div>

                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}
export default BrowseResults;