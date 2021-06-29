import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseURL, config } from '../services';
import '../styles/SearchBrowse.css';

function SearchBrowse(props) {
  //declare stateful variables to hold browsable subjects 
  //(user can browse by genre, repTag, or authorTag)
  const [genres, setGenres] = useState([]);
  const [repTags, setTags] = useState([]);
  const [authorTags, setAuthorTags] = useState([]);

  //declare stateful variabls to hold seach terms for each searchable subject
  const [genreSearchTerms, setGenreSearchTerms] = useState([]);
  const [repTagSearchTerms, setRepTagSearchTerms] = useState([]);
  const [authorTagSearchTerms, setAuthorTagSearchTerms] = useState([]);

  //variables to hold classNames for browsable lists, for the purposes of
  //toggling list visibility
  const [genreListClass, setGenreListClass] = useState("browseList invisible");
  const [repTagListClass, setRepTagListClass] = useState("browseList invisible");
  const [authorTagListClass, setAuthorTagListClass] = useState("browseList invisible");

  //useEffect to get lists of genres, repTags, and authorTags for respective tables
  useEffect(() => {
    const fetchGenres = async() => {
      const url=`${baseURL}/genres`;
      const resp = await axios.get(url, config);
      setGenres(resp.data.records);
    }
    fetchGenres();
  }, []);

  //function to toggle visibilty On visibilty of Genre List
  const displayGenreList = () => {
    setGenreListClass("browseList");
    setRepTagListClass("browseList invisible");
    setAuthorTagListClass("browseList invisible");
  }

  //function to toggle visibilty On visibilty of repTag List
  const displayRepTagList = () => {
    setRepTagListClass("browseList");
    setGenreListClass("browseList invisible");
    setAuthorTagListClass("browseList invisible");
  }

  //function to toggle visibilty On visibilty of authorTag List
  const displayAuthorTagList = () => {
    setAuthorTagListClass("browseList");
    setGenreListClass("browseList invisible");
    setRepTagListClass("browseList invisible");
  }

  //function to create an alphabetical list of browsable topics for an individual browse list
  //with list item linked to search results page
  const createBrowseList = (parentList, filterByField, filterByValue, listTermKey) => {
    //filter main list into subLists to be divided among subheadings
    const filteredList = parentList.filter((listItem) =>
    listItem.fields[filterByField] === filterByValue);

    //alphabetize list of objects by the term that will appear on list
    const alphaList = filteredList.sort(function(a, b) {
      return a.fields[listTermKey].localeCompare(b.fields[listTermKey]);
    });

    //return list while awaiting async function completion to retrieve lists
    if(alphaList.length===0) {
      return (
        <p>Loading...</p>
      )
    }
    
    //return an unordered list of browsable topics linked to search results page
    return (
      <ul>
        {alphaList.map((listObject) => (
          <li key={listObject.id}>
            <Link to={`/browse/results/${listTermKey}=${listObject.fields[listTermKey]}`} browseID={listObject.id}>
              {listObject.fields[listTermKey]}
            </Link>
          </li>
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
              {createBrowseList(genres, "parentGenre", "fiction", "genre")}
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