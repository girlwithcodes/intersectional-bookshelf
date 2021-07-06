import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';
import '../styles/SearchBrowse.css';

function SearchBrowse(props) {
  //declare get lists from props 
  const genres = props.genreList;
  const repTags = props.repTagList;
  const authorTags = props.authorTagList;

  //variables to hold classNames for browsable lists, for the purposes of
  //toggling list visibility
  const [genreListClass, setGenreListClass] = useState("browseList invisible");
  const [repTagListClass, setRepTagListClass] = useState("browseList invisible");
  const [authorTagListClass, setAuthorTagListClass] = useState("browseList invisible");

  const [genreTabClass, setGenreTabClass] = useState("browseLink");
  const [repTagTabClass, setRepTagTabClass] = useState("browseLink");
  const [authorTagTabClass, setAuthorTagTabClass] = useState("browseLink");

  //function to toggle visibilty On visibilty of Genre List
  const displayGenreList = () => {
    setGenreListClass("browseList");
    setRepTagListClass("browseList invisible");
    setAuthorTagListClass("browseList invisible");

    setGenreTabClass("browseLink highlighted");
    setRepTagTabClass("browseLink");
    setAuthorTagTabClass("browseLink");
  }

  //function to toggle visibilty On visibilty of repTag List
  const displayRepTagList = () => {
    setRepTagListClass("browseList");
    setGenreListClass("browseList invisible");
    setAuthorTagListClass("browseList invisible");

    setRepTagTabClass("browseLink highlighted");
    setGenreTabClass("browseLink");
    setAuthorTagTabClass("browseLink");
  }

  //function to toggle visibilty On visibilty of authorTag List
  const displayAuthorTagList = () => {
    setAuthorTagListClass("browseList");
    setGenreListClass("browseList invisible");
    setRepTagListClass("browseList invisible");

    setAuthorTagTabClass("browseLink highlighted");
    setRepTagTabClass("browseLink");
    setGenreTabClass("browseLink");
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
            <Link to={`/browseResults/${listTermKey}/${listObject.id}`}>
              {listObject.fields[listTermKey]}
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <main>
      
      <SearchForm setSearchObject={props.setSearchObject}/>
      
      <h3 id="browse-section-title">Browse</h3>
      <section id="browse-by-section">
        <div id="browse-by-tabs">
          <button className={genreTabClass} onClick={displayGenreList}>Browse by Genre</button>
          <button className={repTagTabClass} onClick={displayRepTagList}>Browse by Representation Tag</button>
          <button className={authorTagTabClass} onClick={displayAuthorTagList}>Browse by Author Tag</button>
        </div>

        <div className={genreListClass} id="genre-browse-list">
          <div>
            <h4>Fiction Genres</h4>
              {createBrowseList(genres, "parentGenre", "fiction", "genre")}
          </div>

          <div>
            <h4>Nonfiction Genres</h4>
              {createBrowseList(genres, "parentGenre", "nonfiction", "genre")}
          </div>

          <div>
            <h4>Poetry/Essay Genres</h4>
              {createBrowseList(genres, "parentGenre", "poetry/essay", "genre")}
          </div>
        </div>
        
        <div className={repTagListClass} id="rep-tag-browse-list">
          <div>
            <h4>Race and Ethnic Identity</h4>
            {createBrowseList(repTags, "typeOfTag", 1, "repTag")}
          </div>

          <div>
            <h4>Orientation and Gender Identity</h4>
            {createBrowseList(repTags, "typeOfTag", 2, "repTag")}
          </div>

          <div>
            <h4>Disability</h4>
            {createBrowseList(repTags, "typeOfTag", 3, "repTag")}
          </div>

          <div>
            <h4>Neurodivergence and Mental Health</h4>
            {createBrowseList(repTags, "typeOfTag", 4, "repTag")}
          </div>

          <div>
            <h4>Body Positivity and Physical Form</h4>
            {createBrowseList(repTags, "typeOfTag", 5, "repTag")}
          </div>

          <div>
            <h4>Other Representation</h4>
            {createBrowseList(repTags, "typeOfTag", 6, "repTag")}
          </div> 
        </div>

        <div className={authorTagListClass} id="author-tag-browse-list">
          <div>
            <h4>Race and Ethnic Identity</h4>
            {createBrowseList(authorTags, "typeOfTag", 1, "authorTag")}
          </div>
        
          <div>
            <h4>Orientation and Gender Identity</h4>
            {createBrowseList(authorTags, "typeOfTag", 2, "authorTag")}
          </div>
          
          <div>
            <h4>Disability</h4>
            {createBrowseList(authorTags, "typeOfTag", 3, "authorTag")}
          </div>
          
          <div>
            <h4>Body Positivity and Physical Form</h4>
            {createBrowseList(authorTags, "typeOfTag", 4, "authorTag")}
          </div>
          
          <div>
            <h4>Neurodivergence and Mental Health</h4>
            {createBrowseList(authorTags, "typeOfTag", 5, "authorTag")}
          </div>
          
          <div>
            <h4>Other Representation</h4>
            {createBrowseList(authorTags, "typeOfTag", 6, "authorTag")}
          </div>
        </div>
      </section>
      
    </main>
  )
}
export default SearchBrowse;