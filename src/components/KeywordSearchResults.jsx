import { Link, useParams } from 'react-router-dom';
import '../styles/BrowseAndSearchResults.css';
function KeywordSearchResults(props) {
  const params = useParams();
  let searchTerm = params.term.toLowerCase();
  searchTerm = searchTerm.replaceAll("%20", " ");
  searchTerm = searchTerm.replaceAll("#", "");
  const titleResults = props.bookList.filter((book)=>book.fields.title.toLowerCase().includes(searchTerm));
  const authorResults = props.bookList.filter((book)=>book.fields.author.toLowerCase().includes(searchTerm));
  const themeResults = props.bookList.filter((book)=>{
    if(book.fields.themeTags && book.fields.themeTags.length!==0) {
      return book.fields.themeTags.includes(searchTerm)
    } else {
      return false;
    }
  });

  const bookMatches = [...titleResults, ...authorResults, ...themeResults];


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
  if(bookMatches && bookMatches.length!==0) {
    return (
      <main className="search-results-main">
        <h2>Search Results</h2>
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
    )
  } else {
    return (
      <h3>No Results Found</h3>
    )
  }
  
}

export default KeywordSearchResults;