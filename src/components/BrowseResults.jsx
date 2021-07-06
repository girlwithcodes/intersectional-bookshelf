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

  return (
    <main>
      <h2>Browse Results</h2>
      <ul className="book-matches-list">
        {bookMatches.map((book)=>(
          <Link to={`/bookDetail/${book.id}`} key={book.id}>
            <li>
              <div className="book-match-div">
                <img className="results-list-image" src={book.fields.imageURL} />
                <div className="book-result-info-div">
                  <h6>{book.fields.title}</h6>
                  <div>
                    {book.fields.author}
                    {createTagList(book, "author")}
                  </div>
                  {createTagList(book, "rep")}
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