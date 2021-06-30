import { useEffect, useState } from 'react';
import { Link, Route, useHistory } from 'react-router-dom';
import axios from 'axios';
import { baseURL, config } from '../services';
import SearchResults from './SearchResults';
import '../styles/SearchForm.css';

function SearchForm(props) {
   //declare stateful variabls to hold seach terms for each searchable subject
  const [genreSearchTerms, setGenreSearchTerms] = useState([]);
  const [repTagSearchTerms, setRepTagSearchTerms] = useState([]);
  const [authorTagSearchTerms, setAuthorTagSearchTerms] = useState([]);

  const [genreInput, setGenreInput] = useState("");
  const [repTagInput, setRepTagInput] = useState("");
  const [authorTagInput, setAuthorTagInput] = useState("");

  const [searchObject, setSearchObject] = useState({})


  useEffect(()=>{
    setSearchObject({
      genreTerms: genreSearchTerms,
      repTagTerms: repTagSearchTerms,
      authorTagTerms: authorTagSearchTerms
    });
  }, [genreSearchTerms, repTagSearchTerms, authorTagSearchTerms]);


  const handleInputChange = (e, inputField) => {
    e.preventDefault();
    switch(inputField) {
      case "genre":
        setGenreSearchTerms([...genreSearchTerms, genreInput]);
        setGenreInput("");
        break;
      case "repTag":
        setRepTagSearchTerms([...repTagSearchTerms, repTagInput]);
        setRepTagInput("");
        break;
      case "authorTag":
        setAuthorTagSearchTerms([...authorTagSearchTerms, authorTagInput]);
        setAuthorTagInput("");
    }
  }

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
    <form id="search-for-books-form">
      <section id="search-form-inputs-section">
        <fieldset className="book-search-inputs" id="genre-search-inputs">
          <h4>Search for Genres:</h4>
          <input type="text" name="genre-search-input" id="genre-search-input" value={genreInput} onChange={(e)=>setGenreInput(e.target.value)}/>
          <button className="add-search-input-button" onClick={(e)=>handleInputChange(e,"genre")}>➡️ </button>
        </fieldset>

        <fieldset className="book-search-inputs" id="repTag-search-inputs">
          <h4>Search for Representation Tags:</h4>
          <input type="text" name="repTag-search-input" id="repTag-search-input" value={repTagInput} onChange={(e)=>setRepTagInput(e.target.value)}/>
          <button className="add-search-input-button" onClick={(e)=>handleInputChange(e,"repTag")}>➡️ </button>
        </fieldset>

        <fieldset className="book-search-inputs" id="authorTag-search-inputs">
          <h4>Search for Author Representation Tags: </h4>
          <input type="text" name="authorTag-search-input" id="authorTag-search-input" value={authorTagInput} onChange={(e)=>setAuthorTagInput(e.target.value)}/>
          <button className="add-search-input-button" onClick={(e)=>handleInputChange(e,"authorTag")}>➡️ </button>
        </fieldset>
      </section>

      <section id="current-search-terms-list">
        <h5>Current Search Terms: </h5>
        <h6>Genres:</h6>
          {genreSearchTerms.map((term)=> (
            <span className="search-list-display-term" key={term} onClick={()=>removeFromList(term, "genre")}>{term}</span>
          ))}
        <h6>Representation Tags:</h6>
          {repTagSearchTerms.map((term)=> (
            <span className="search-list-display-term" key={term} onClick={()=>removeFromList(term, "repTag")}>{term}</span>
          ))}
        <h6>Author Representation Tags:</h6>
          {authorTagSearchTerms.map((term)=> (
            <span className="search-list-display-term" key={term} onClick={()=>removeFromList(term, "authorTag")}>{term}</span>
          ))}
      </section>
      <Link to="/searchResults">
        <button>Search</button>
      </Link>
    </form>

    <Route path="/searchResults">
      <SearchResults searchObject={searchObject}/>
    </Route>
    </section>
  )
}

export default SearchForm;