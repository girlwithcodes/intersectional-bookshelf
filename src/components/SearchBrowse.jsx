import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/SearchBrowse.css';

function SearchBrowse(props) {
  const [genres, setGenres] = useState([]);
  const [repTags, setTags] = useState([]);
  const [authorTags, setAuthorTags] = useState([]);

  const [genreSearchTerms, setGenreSearchTerms] = useState([]);
  const [repTagSearchTerms, setRepTagSearchTerms] = useState([]);
  const [authorTagSearchTerms, setAuthorTagSearchTerms] = useState([]);

  const [genreListClass, setGenreListClass] = useState("browseList invisible");
  const [repTagListClass, setRepTagListClass] = useState("browseList invisible");
  const [authorTagListClass, setAuthorTagListClass] = useState("browseList invisible");

  const displayGenreList = () => {
    setGenreListClass("browseList");
    setRepTagListClass("browseList invisible");
    setAuthorTagListClass("browseList invisible");
  }

  const displayRepTagList = () => {
    setRepTagListClass("browseList");
    setGenreListClass("browseList invisible");
    setAuthorTagListClass("browseList invisible");
  }

  const displayAuthorTagList = () => {
    setAuthorTagListClass("browseList");
    setGenreListClass("browseList invisible");
    setRepTagListClass("browseList invisible");
  }

  return (
    <main>
      <section id="search-section">
        <form>
          <h3>search form here</h3>
        </form>
      </section>
      <section id="browse-by-section">
        <button className="browseLink">Browse by Genre</button>
        <button className="browseLink">Browse by Representation Tag</button>
        <button className="browseLink">Browse by Author Tag</button>

        <div className={genreListClass}id="genre-browse-list" onClick={displayGenreList}></div>
        <div className={repTagListClass} id="rep-tag-browse-list" onClick={displayRepTagList}></div>
        <div className={authorTagListClass} id="author-tag-browse-list" onClick={displayAuthorTagList}></div>
      </section>
    </main>
  )
}
export default SearchBrowse;