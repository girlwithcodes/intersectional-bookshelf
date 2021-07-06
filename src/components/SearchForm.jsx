import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SearchForm.css';

function SearchForm(props) {
   //declare stateful variables to hold seach terms for each searchable subject
  const [genreSearchTerms, setGenreSearchTerms] = useState([]);
  const [repTagSearchTerms, setRepTagSearchTerms] = useState([]);
  const [authorTagSearchTerms, setAuthorTagSearchTerms] = useState([]);

  //declare stateful variables to hold value of current text input
  const [genreInput, setGenreInput] = useState("");
  const [repTagInput, setRepTagInput] = useState("");
  const [authorTagInput, setAuthorTagInput] = useState("");

  const [keywordTerm, setKeywordTerm] = useState("");

  //update the search terms object whenever the genre, repTag, and authorTag terms are changed
  useEffect(()=>{
    props.setSearchObject({
      genreTerms: genreSearchTerms,
      repTagTerms: repTagSearchTerms,
      authorTagTerms: authorTagSearchTerms
    });
  }, [genreSearchTerms, repTagSearchTerms, authorTagSearchTerms]);


  //add current input text to appropriate search terms array when an arrow button is clicked
  const handleInputChange = (e, inputField) => {
    e.preventDefault();
    switch(inputField) {
      case "genre":
        setGenreSearchTerms([...genreSearchTerms, genreInput.toLowerCase()]);
        setGenreInput("");
        break;
      case "repTag":
        setRepTagSearchTerms([...repTagSearchTerms, repTagInput.toLowerCase()]);
        setRepTagInput("");
        break;
      case "authorTag":
        setAuthorTagSearchTerms([...authorTagSearchTerms, authorTagInput.toLowerCase()]);
        setAuthorTagInput("");
    }
  }

  //delete a search term from the appropriate search term array when user clicks clicks the term in their displayed search term list
  const removeFromList = (itemToRemove, listToEdit) => {
    switch (listToEdit) {
      case "genre":
        const editedListG = genreSearchTerms.filter((listItem)=>listItem!==itemToRemove);
        setGenreSearchTerms(editedListG);
        break;
      case "repTag":
        const editedListR = repTagSearchTerms.filter((listItem)=> listItem !== itemToRemove);
        setRepTagSearchTerms(editedListR);
        break;
      case "authorTag":
        const editedListA = authorTagSearchTerms.filter((listItem)=> listItem !== itemToRemove);
        setAuthorTagSearchTerms(editedListA);
        break;
    }
  }

  return (
    <section id="search-section">
      <h3>Search</h3>
      
      <section id="keyword-search-section">
        <h4>Search by Author, Title, or Keyword</h4>
        <form id="keyword-search-form">
          <input type="text" id="keyword-input" value={keywordTerm}
            onChange={(e)=>{setKeywordTerm(e.target.value)}}/>
          <Link to={`/keywordSearchResults/${keywordTerm}`}>
            <button className="search-for-terms-button">Search</button>
          </Link>
        </form>
      </section>

      <section id="search-by-tag-section">
        <h4>Search by Genre and Tag</h4>
        <h5>Enter a term, then press the arrow to add to search list</h5>
        <form id="search-for-books-form">
          
          <section id="search-form-inputs-section">
            <fieldset className="book-search-inputs" id="genre-search-inputs">
              <label htmlFor="genre-search-input">Genres:</label>
              <input type="text" name="genre-search-input" id="genre-search-input" value={genreInput} onChange={(e)=>setGenreInput(e.target.value)}/>
              <button className="add-search-input-button" onClick={(e)=>handleInputChange(e,"genre")}>➡️ </button>
            </fieldset>

            <fieldset className="book-search-inputs" id="repTag-search-inputs">
              <label htmlFor="repTag-search-input">Representation Tags:</label>
              <input type="text" name="repTag-search-input" id="repTag-search-input" value={repTagInput} onChange={(e)=>setRepTagInput(e.target.value)}/>
              <button className="add-search-input-button" onClick={(e)=>handleInputChange(e,"repTag")}>➡️ </button>
            </fieldset>

            <fieldset className="book-search-inputs" id="authorTag-search-inputs">
              <label htmlFor="authorTag-search-input">Author Tags: </label>
              <input type="text" name="authorTag-search-input" id="authorTag-search-input" value={authorTagInput} onChange={(e)=>setAuthorTagInput(e.target.value)}/>
              <button className="add-search-input-button" onClick={(e)=>handleInputChange(e,"authorTag")}>➡️ </button>
            </fieldset>
          </section>

          <section id="current-search-terms-list">
            <h5>Current Search Terms</h5>
            <div className="search-terms-list">
              <h6>Genres:</h6>
                {genreSearchTerms.map((term)=> (
                  <span className="search-list-display-term" key={term} onClick={()=>removeFromList(term, "genre")}>{term}</span>
                ))}
            </div>
            <div className="search-terms-list">
              <h6>Representation Tags:</h6>
                {repTagSearchTerms.map((term)=> (
                  <span className="search-list-display-term" key={term} onClick={()=>removeFromList(term, "repTag")}>{term}</span>
                ))}
            </div>
            <div className="search-terms-list">
              <h6>Author Representation Tags:</h6>
                {authorTagSearchTerms.map((term)=> (
                  <span className="search-list-display-term" key={term} onClick={()=>removeFromList(term, "authorTag")}>{term}</span>
                ))}
            </div>
          </section>
          <Link to="/searchResults">
            <button className="search-for-terms-button">Search</button>
          </Link>
        </form>
      </section>
    </section>
  )
}

export default SearchForm;