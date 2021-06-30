import { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import { baseURL, config } from '../services';
import SearchForm from './SearchForm';
import BrowseResults from './BrowseResults';
import '../styles/SearchBrowse.css';

function SearchBrowse(props) {
  //declare stateful variables to hold browsable subjects 
  //(user can browse by genre, repTag, or authorTag)
  const [genres, setGenres] = useState([]);
  const [repTags, setRepTags] = useState([]);
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

    const fetchRepTags = async() => {
      const url=`${baseURL}/repTags`;
      const resp = await axios.get(url, config);
      setRepTags(resp.data.records);
    }

    const fetchAuthorTags = async() => {
      const url=`${baseURL}/authorTags`;
      const resp = await axios.get(url, config);
      setAuthorTags(resp.data.records);
    }

    fetchGenres();
    fetchRepTags();
    fetchAuthorTags();
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
        <p>No Results</p>
      )
    }
    
    //return an unordered list of browsable topics linked to search results page
    return (

      <ul className="browse-by-list">
        {alphaList.map((listObject) => (
          <li key={listObject.id}>
            <Link to={`/browseResults/${listObject.fields[listTermKey]}`}>
              {listObject.fields[listTermKey]}
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <main>
      <h3>Search</h3>
      <section id="search-section">
        <SearchForm />
      </section>

      <h3>Browse</h3>
      <section id="browse-by-section">
        <div id="browse-by-tabs">
          <button className="browseLink" onClick={displayGenreList}>Browse by Genre</button>
          <button className="browseLink" onClick={displayRepTagList}>Browse by Representation Tag</button>
          <button className="browseLink" onClick={displayAuthorTagList}>Browse by Author Tag</button>
        </div>

        <div className={genreListClass} id="genre-browse-list">
            <h4>Fiction Genres</h4>
              {createBrowseList(genres, "parentGenre", "fiction", "genre")}
            
            <h4>Nonfiction Genres</h4>
              {createBrowseList(genres, "parentGenre", "nonfiction", "genre")}

            <h4>Poetry/Essay Genres</h4>
              {createBrowseList(genres, "parentGenre", "poetry/essay", "genre")}
        </div>
        
        <div className={repTagListClass} id="rep-tag-browse-list">
          <h4>Race and Ethnicity Representation Tags</h4>
            {createBrowseList(repTags, "typeOfTag", 1, "repTag")}

          <h4>Gender and Orientation Representation Tags</h4>
            {createBrowseList(repTags, "typeOfTag", 2, "repTag")}

          <h4>Disability Representation Tags</h4>
            {createBrowseList(repTags, "typeOfTag", 3, "repTag")}

          <h4>Neurodivergence Representation Tags</h4>
            {createBrowseList(repTags, "typeOfTag", 4, "repTag")}

          <h4>Mental Health Representation Tags</h4>
            {createBrowseList(repTags, "typeOfTag", 5, "repTag")}

          <h4>Body Positivity Representation Tags</h4>
            {createBrowseList(repTags, "typeOfTag", 6, "repTag")}
        </div>

        <div className={authorTagListClass} id="author-tag-browse-list">
          <h4>Race and Ethnicity Author Representation Tags</h4>
            {createBrowseList(authorTags, "typeOfTag", 1, "authorTag")}

          <h4>Gender and Orientation Author Representation Tags</h4>
            {createBrowseList(authorTags, "typeOfTag", 2, "authorTag")}

          <h4>Disability Author Representation Tags</h4>
            {createBrowseList(authorTags, "typeOfTag", 3, "authorTag")}

          <h4>Neurodivergence Author Representation Tags</h4>
            {createBrowseList(authorTags, "typeOfTag", 4, "authorTag")}

          <h4>Mental Health Author Representation Tags</h4>
            {createBrowseList(authorTags, "typeOfTag", 5, "authorTag")}

          <h4>Body Positivity Author Representation Tags</h4>
            {createBrowseList(authorTags, "typeOfTag", 6, "authorTag")}
        </div>
      </section>
    </main>
  )
}
export default SearchBrowse;