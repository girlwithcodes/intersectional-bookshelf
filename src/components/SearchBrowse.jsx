import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseURL, config } from '../services';
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

  useEffect(() => {
    const fetchGenres = async() => {
      const url=`${baseURL}/genres`;
      const resp = await axios.get(url, config);
      setGenres(resp.data.records);
    }
    fetchGenres();
  }, []);

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

  const createGenreList = (filterTerm) => { 
    const filteredList = genres.filter((listItem) => listItem.fields.parentGenre === filterTerm);
    const genreNamesList = filteredList.map((listItem) => listItem.fields.genre);
    const alphabetizedList = genreNamesList.sort((a,b) => a-b);
    console.log(genreNamesList);
    if(alphabetizedList.length===0){
      return (
        <p>Loading...</p>
      );
    }
    console.log(alphabetizedList);
    return (
      <ul>
        {alphabetizedList.map((genre) => (
          <li>{genre}</li>
        ))}
      </ul>
    )
  }

  return (
    <main>
      <section id="search-section">
        <form>
          <h3>search form here</h3>
        </form>
      </section>
      <section id="browse-by-section">
        <button className="browseLink" onClick={displayGenreList}>Browse by Genre</button>
        <button className="browseLink" onClick={displayRepTagList}>Browse by Representation Tag</button>
        <button className="browseLink" onClick={displayAuthorTagList}>Browse by Author Tag</button>

        <div className={genreListClass}id="genre-browse-list">
          <ul id="genre-List">
            <h4>Fiction Genres</h4>
            <ul>
              {createGenreList("fiction")}
              {/* {genres.filter(genre=>genre.fields.parentGenre==="fiction").sort((a,b)=>a-b).map((genre) => (
                <li>{genre.fields.genre}</li>
              ))} */}
            </ul>
            <h4>Nonfiction Genres</h4>
            <ul></ul>
            <h4>Poetry/Essay Genres</h4>
            <ul></ul>
          </ul>
        </div>
        <div className={repTagListClass} id="rep-tag-browse-list">
          <ul>
            <li>repTag list item</li>
            <li>repTag list item</li>
            <li>repTag list item</li>
          </ul>
        </div>
        <div className={authorTagListClass} id="author-tag-browse-list">
          <ul>
            <li>authorTag list item</li>
            <li>authorTag list item</li>
            <li>authorTag list item</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
export default SearchBrowse;