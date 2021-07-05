import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL, config } from '../services';
import '../styles/AddRec.css';

function AddRec() {
  const [toggleFetch, setToggleFetch] = useState(false);

  //set state for basic book recommendation information
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [recAuthor, setRecAuthor] = useState("");

  //set state for lists to retrieve from API for selection checklists
  const [genreList, setGenreList] = useState("");
  const [repTagList, setRepTagList] = useState([]);
  const [authorTagList, setAuthorTagList] = useState([]);
  
  //set state for temporary and final inputs - genre selection
  const [finalBookGenres, setFinalBookGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [customGenre, setCustomGenre] = useState("");
  const [customGenreType, setCustomGenreType] = useState("");

  //set state for temporary and final inputs - repTag selection
  const [finalBookRepTags, setFinalBookRepTags] = useState([]);
  const [selectedRepTags, setSelectedRepTags] = useState([]);
  const [customRepTag, setCustomRepTag] = useState("");
  const [customRepTagType, setCustomRepTagType] = useState("");

  //set state for temporary and final inputs - authorTag selection
  const [finalBookAuthorTags, setFinalBookAuthorTags]= useState([]);
  const [selectedAuthorTags, setSelectedAuthorTags] = useState([]);
  const [customAuthorTag, setCustomAuthorTag] = useState("");
  const [customAuthorTagType, setCustomAuthorTagType] = useState("");

  //set state for temporary and final inputs - themeTag selection
  const [currentThemeTag, setCurrentThemeTag] = useState([]);
  const [finalThemeTags, setFinalThemeTags] = useState([]);
  const [selectedThemeTags, setSelectedThemeTags] = useState([]);

  //set state for temporary and final inputs - triggerWarning selection
  const [currentTriggerWarning, setCurrentTriggerWarning] = useState([]);
  const [finalTriggerWarnings, setFinalTriggerWarnings] =useState([]);
  const [selectedTriggerWarnings, setSelectedTriggerWarnings] = useState([]);

  //set state for visibility of dropdown menus and submenus for checklists
  const [genreSelectionVisibility, setGenreSelectionVisibility] = useState(false);
  const [repTagSelectionVisibility, setRepTagSelectionVisibility] = useState(false);
  const [authorTagSelectionVisibility, setAuthorTagSelectionVisibility] = useState(false);
  const [fictionSelectionVisibility, setFictionSelectionVisibility] = useState(false);
  const [nonfictionSelectionVisibility, setNonfictionSelectionVisibility] = useState(false);
  const [poetrySelectionVisibility, setPoetrySelectionVisibility] = useState(false);
  const [repTag1SelectionVisibility, setRepTag1SelectionVisibility] = useState(false);
  const [repTag2SelectionVisibility, setRepTag2SelectionVisibility] = useState(false);
  const [repTag3SelectionVisibility, setRepTag3SelectionVisibility] = useState(false);
  const [repTag4SelectionVisibility, setRepTag4SelectionVisibility] = useState(false);
  const [repTag5SelectionVisibility, setRepTag5SelectionVisibility] = useState(false);
  const [repTag6SelectionVisibility, setRepTag6SelectionVisibility] = useState(false);
  const [authorTag1SelectionVisibility, setAuthorTag1SelectionVisibility] = useState(false);
  const [authorTag2SelectionVisibility, setAuthorTag2SelectionVisibility] = useState(false);
  const [authorTag3SelectionVisibility, setAuthorTag3SelectionVisibility] = useState(false);
  const [authorTag4SelectionVisibility, setAuthorTag4SelectionVisibility] = useState(false);
  const [authorTag5SelectionVisibility, setAuthorTag5SelectionVisibility] = useState(false);
  const [authorTag6SelectionVisibility, setAuthorTag6SelectionVisibility] = useState(false);

  //fetch lists of current genres, rep tags, and author tags from API
  useEffect(()=> {
    const fetchGenres = async() => {
      const url=`${baseURL}/genres`;
      const resp = await axios.get(url, config);
      console.log(resp.data.records);
      setGenreList(resp.data.records);
    }

    const fetchRepTags = async() => {
      const url = `${baseURL}/repTags`;
      const resp = await axios.get(url, config);
      console.log(resp.data.records);
      setRepTagList(resp.data.records);
    }

    const fetchAuthorTags = async() => {
      const url = `${baseURL}/authorTags`;
      const resp = await axios.get(url, config);
      console.log(resp.data.records);
      setAuthorTagList(resp.data.records);
    }

    fetchGenres();
    fetchRepTags();
    fetchAuthorTags();
  }, [toggleFetch]);

  //adds new genre to genre table if user enters custom genre that is not already in the table
  const addGenre = async() => {
    const url=`${baseURL}/genres`
    const genre = customGenre;
    const parentGenre = customGenreType;
    const newGenre = { 
      genre,
      parentGenre,
    }
    await axios.post(url, {fields: newGenre}, config);
    setToggleFetch((curr)=>!curr);
  }
  
  //check if user-entered custom genre already exists in genre table,
  //call function to add genre if not
  const checkGenre = (e) => {
    e.preventDefault();
    const genresByName=genreList.map((genre)=>genre.fields.genre);
    if(genresByName.includes(customGenre)) {
      setSelectedGenres([...selectedGenres, customGenre]);
    } else {
      setSelectedGenres([...selectedGenres, customGenre]);
      addGenre();
    }
  }
  

  //toggles visibilty for genre selection section
  const setGenreSectionClasses = () => {
    if(genreSelectionVisibility) {
      return "tag-selection-dropdown";
    }
    return "tag-selection-dropdown invisible";
  }

  //toggles visibilty for rep tag selection section
  const setRepTagSectionClasses = () => {
    if(repTagSelectionVisibility) {
      return "tag-selection-dropdown";
    }
    return "tag-selection-dropdown invisible";
  }

  //toggles visibilty for author tag selection section
  const setAuthorTagSectionClasses = () => {
    if(authorTagSelectionVisibility) {
      return "tag-selection-dropdown";
    }
    return "tag-selection-dropdown invisible";
  }

  //toggle visibility for genre selection submenus - fiction
  const setFictionSectionClasses = () => {
    if(fictionSelectionVisibility) {
      return "tag-selection-sub-dropdown";
    }
    return "tag-selection-sub-dropdown invisible";
  }

  //toggle visibility for genre selection submenus - nonfiction
  const setNonfictionSectionClasses = () => {
    if(nonfictionSelectionVisibility) {
      return "tag-selection-sub-dropdown";
    }
    return "tag-selection-sub-dropdown invisible";
  }

  //toggle visibility for genre selection submenus - poetry/essay
  const setPoetrySectionClasses = () => {
    if(poetrySelectionVisibility) {
      return "tag-selection-sub-dropdown";
    }
    return "tag-selection-sub-dropdown invisible";
  }

  //toggle visibility for repTag selection submenus - race & ethnic rep
  const setRepTagSubmenu1Classes = () => {
    if(repTag1SelectionVisibility) {
      return "tag-selection-sub-dropdown";
    }
    return "tag-selection-sub-dropdown invisible";
  }

  //toggle visibility for repTag selection submenus - orientation & gender rep
  const setRepTagSubmenu2Classes = () => {
    if(repTag2SelectionVisibility) {
      return "tag-selection-sub-dropdown";
    }
    return "tag-selection-sub-dropdown invisible";
  }

  //toggle visibility for repTag selection submenus - disability rep
  const setRepTagSubmenu3Classes = () => {
    if(repTag3SelectionVisibility) {
      return "tag-selection-sub-dropdown";
    }
    return "tag-selection-sub-dropdown invisible";
  }

  //toggle visibility for repTag selection submenus - body positivity rep
  const setRepTagSubmenu4Classes = () => {
    if(repTag4SelectionVisibility) {
      return "tag-selection-sub-dropdown";
    }
    return "tag-selection-sub-dropdown invisible";
  }

  //toggle visibility for repTag selection submenus - neurodivergent rep
  const setRepTagSubmenu5Classes = () => {
    if(repTag5SelectionVisibility) {
      return "tag-selection-sub-dropdown";
    }
    return "tag-selection-sub-dropdown invisible";
  }

  //toggle visibility for repTag selection submenus - other rep
  const setRepTagSubmenu6Classes = () => {
    if(repTag6SelectionVisibility) {
      return "tag-selection-sub-dropdown";
    }
    return "tag-selection-sub-dropdown invisible";
  }

  //toggle visibility for authorTag selection submenus - race & ethnic rep
  const setAuthorTagSubmenu1Classes = () => {
    if(authorTag1SelectionVisibility) {
      return "tag-selection-sub-dropdown";
    }
    return "tag-selection-sub-dropdown invisible";
  }

  //toggle visibility for authorTag selection submenus - orientation & gender rep
  const setAuthorTagSubmenu2Classes = () => {
    if(authorTag2SelectionVisibility) {
      return "tag-selection-sub-dropdown";
    }
    return "tag-selection-sub-dropdown invisible";
  }

  //toggle visibility for authorTag selection submenus - disability rep
  const setAuthorTagSubmenu3Classes = () => {
    if(authorTag3SelectionVisibility) {
      return "tag-selection-sub-dropdown";
    }
    return "tag-selection-sub-dropdown invisible";
  }

  //toggle visibility for authorTag selection submenus - body positivity rep
  const setAuthorTagSubmenu4Classes = () => {
    if(authorTag4SelectionVisibility) {
      return "tag-selection-sub-dropdown";
    }
    return "tag-selection-sub-dropdown invisible";
  }

  //toggle visibility for authorTag selection submenus - neurodivergent rep
  const setAuthorTagSubmenu5Classes = () => {
    if(authorTag5SelectionVisibility) {
      return "tag-selection-sub-dropdown";
    }
    return "tag-selection-sub-dropdown invisible";
  }

  //toggle visibility for authorTag selection submenus - other rep
  const setAuthorTagSubmenu6Classes = () => {
    if(authorTag6SelectionVisibility) {
      return "tag-selection-sub-dropdown";
    }
    return "tag-selection-sub-dropdown invisible";
  }

  //handles genre checklist event - adds genre to or removes genre from currently selected genres
  const handleGenreSelection = (event) => {
    const selection= event.target.value;
    if(selectedGenres.includes(selection)) {
      setSelectedGenres(selectedGenres.filter((genre)=>genre!==selection));
    } else {
      setSelectedGenres([...selectedGenres, selection]);
    }
  }

  //handles repTag checklist event - adds tag to or removes tag from currently selected repTags
  const handleRepTagSelection = (event) => {
    const selection= event.target.value;
    if(selectedRepTags.includes(selection)) {
      setSelectedRepTags(selectedRepTags.filter((tag)=>tag!==selection));
    } else {
      setSelectedRepTags([...selectedRepTags, selection]);
    }
  }

  //handles authorTag checklist event - adds tag to or removes tag from currently selected authorTags
  const handleAuthorTagSelection = (event) => {
    const selection= event.target.value;
    if(selectedAuthorTags.includes(selection)) {
      setSelectedAuthorTags(selectedAuthorTags.filter((tag)=>tag!==selection));
    } else {
      setSelectedAuthorTags([...selectedAuthorTags, selection]);
    }
  }

  //genreates genre selection menu with submenus for fiction, nonfiction, and poetry/essay
  const createGenreSelectionList = () => {
    if(!genreList || genreList.length === 0) {
      return (
        <h4>Loading genres...</h4>
      ); } else {

        //filter lists for submenus
        const fictionGenresList = genreList.filter((genre)=>genre.fields.parentGenre==="fiction");
        const nonfictionGenresList = genreList.filter((genre)=>genre.fields.parentGenre==="nonfiction");
        const poetryEssayGenresList = genreList.filter((genre)=>genre.fields.parentGenre==="poetry/essay");

        //sort submenu lists alphabetically
        fictionGenresList.sort(function(a, b) {
          return a.fields.genre.localeCompare(b.fields.genre);
        });
        nonfictionGenresList.sort(function(a, b) {
          return a.fields.genre.localeCompare(b.fields.genre);
        });
        poetryEssayGenresList.sort(function(a, b) {
          return a.fields.genre.localeCompare(b.fields.genre);
        });
  
      //return genre list with submenu checklists
      return (
        <ul className="submenus-ul">
          <li className="submenus-li">
            <button className="tag-selection-sub-button" 
              onClick={(e)=>{
                e.preventDefault();
                setFictionSelectionVisibility((curr)=>!curr);
                }}>Fiction Genres</button>
            <ul className={setFictionSectionClasses()} id="genre-fiction-selection-list">
              {fictionGenresList.map((genre)=>(
                <li className="selection-tag" key={genre.id}>
                  <input type="checkbox" id={genre.id} name="genre-select"
                  value={genre.fields.genre} onChange={handleGenreSelection} selected={selectedGenres.includes(genre.fields.genre)}/>
                  <label htmlFor={genre.id}>{genre.fields.genre}</label>
                </li>
              ))}
            </ul>
          </li>

          <li className="submenus-li">
            <button className="tag-selection-sub-button"
              onClick={(e)=>{
                e.preventDefault();
                setNonfictionSelectionVisibility((curr)=>!curr);
                }}>Nonfiction Genres</button>
            <ul className={setNonfictionSectionClasses()} id="genre-nonfiction-selection-list">
              {nonfictionGenresList.map((genre)=>(
                <li className="selection-tag" key={genre.id}>
                  <input type="checkbox" id={genre.id} name="genre-select"
                  value={genre.fields.genre} onChange={handleGenreSelection}/>
                  <label htmlFor={genre.id}>{genre.fields.genre}</label>
                </li>
              ))}
            </ul>
          </li>

          <li className="submenus-li">
            <button className="tag-selection-sub-button"
              onClick={(e)=>{
                e.preventDefault();
                setPoetrySelectionVisibility((curr)=>!curr);
                }}>Poetry/Essay Genres</button>
            <ul className={setPoetrySectionClasses()} id="genre-poetry-essay-selection-list">
              {poetryEssayGenresList.map((genre)=>(
                <li className="selection-tag" key={genre.id}>
                  <input type="checkbox" id={genre.id} name="genre-select"
                  value={genre.fields.genre} onChange={handleGenreSelection}/>
                  <label htmlFor={genre.id}>{genre.fields.genre}</label>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      );
    }
  }

  //generate authorTag selection menu with submenus for different types of representation
  const createAuthorTagSelectionList = () => {

    //filter authorTag list for submenus
    const authorTagsType1 = authorTagList.filter((tag)=>tag.fields.typeOfTag===1);
    const authorTagsType2 = authorTagList.filter((tag)=>tag.fields.typeOfTag===2);
    const authorTagsType3 = authorTagList.filter((tag)=>tag.fields.typeOfTag===3);
    const authorTagsType4 = authorTagList.filter((tag)=>tag.fields.typeOfTag===4);
    const authorTagsType5 = authorTagList.filter((tag)=>tag.fields.typeOfTag===5);
    const authorTagsType6 = authorTagList.filter((tag)=>tag.fields.typeOfTag===6);

    //sort submenu lists alphabetically
    authorTagsType1.sort(function(a, b) {
      return a.fields.authorTag.localeCompare(b.fields.authorTag);
    });
    authorTagsType2.sort(function(a, b) {
      return a.fields.authorTag.localeCompare(b.fields.authorTag);
    });
    authorTagsType3.sort(function(a, b) {
      return a.fields.authorTag.localeCompare(b.fields.authorTag);
    });
    authorTagsType4.sort(function(a, b) {
      return a.fields.authorTag.localeCompare(b.fields.authorTag);
    });
    authorTagsType5.sort(function(a, b) {
      return a.fields.authorTag.localeCompare(b.fields.authorTag);
    });
    authorTagsType6.sort(function(a, b) {
      return a.fields.authorTag.localeCompare(b.fields.authorTag);
    });

    //return authorTag list with submenu checklists
    return (
      <ul className="submenus-ul">
        <li className="submenus-li">
          <button className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setAuthorTag1SelectionVisibility((curr)=>!curr);
            }}>Racial and Ethnic Identity Tags</button>
            <ul className={setAuthorTagSubmenu1Classes()}
            id="author-tag-type-1-selection-list">
              {authorTagsType1.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="authorTag-select"
                  value={tag.id} onChange={handleAuthorTagSelection}/>
                  <label htmlFor={tag.id}>{tag.fields.authorTag}</label>
                </li>
              ))}
              
            </ul>
        </li>

        <li className="submenus-li">
          <button className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setAuthorTag2SelectionVisibility((curr)=>!curr);
            }}>Sexual Orientation and Gender Identity Tags</button>
            <ul className={setAuthorTagSubmenu2Classes()}
            id="author-tag-type-2-selection-list">
              {authorTagsType2.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="authorTag-select"
                  value={tag.id} onChange={handleAuthorTagSelection}/>
                  <label htmlFor={tag.id}>{tag.fields.authorTag}</label>
                </li>
              ))}
            </ul>
        </li>

        <li className="submenus-li">
          <button className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setAuthorTag3SelectionVisibility((curr)=>!curr);
            }}>Disability Representation Tags</button>
            <ul className={setAuthorTagSubmenu3Classes()}
            id="author-tag-type-3-selection-list">
              {authorTagsType3.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="authorTag-select"
                  value={tag.id} onChange={handleAuthorTagSelection}/>
                  <label htmlFor={tag.id}>{tag.fields.authorTag}</label>
                </li>
              ))}
            </ul>
        </li>

        <li className="submenus-li">
          <button className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setAuthorTag4SelectionVisibility((curr)=>!curr);
            }}>Body Positivity and Physical Form Representation Tags</button>
            <ul className={setAuthorTagSubmenu4Classes()}
            id="author-tag-type-4-selection-list">
              {authorTagsType4.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="authorTag-select"
                  value={tag.id} onChange={handleAuthorTagSelection}/>
                  <label htmlFor={tag.id}>{tag.fields.authorTag}</label>
                </li>
              ))}
            </ul>
        </li>

        <li className="submenus-li">
          <button className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setAuthorTag5SelectionVisibility((curr)=>!curr);
            }}>Neurodivergence and Mental Health Representation Tags</button>
            <ul className={setAuthorTagSubmenu5Classes()}
            id="author-tag-type-5-selection-list">
              {authorTagsType5.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="authorTag-select"
                  value={tag.id} onChange={handleAuthorTagSelection}/>
                  <label htmlFor={tag.id}>{tag.fields.authorTag}</label>
                </li>
              ))}
            </ul>
        </li>

        <li className="submenus-li">
          <button className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setAuthorTag6SelectionVisibility((curr)=>!curr);
            }}>Other Represenation Tags</button>
            <ul className={setAuthorTagSubmenu6Classes()}
            id="author-tag-type-6-selection-list">
              {authorTagsType6.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="authorTag-select"
                  value={tag.id} onChange={handleAuthorTagSelection}/>
                  <label htmlFor={tag.id}>{tag.fields.authorTag}</label>
                </li>
              ))}
            </ul>
        </li>
      </ul>
    )
  }

  //generate repTag selection menu with submenus for different types of representation
  const createRepTagSelectionList = () => {

    //filter repTag list for submenus
    const repTagsType1 = repTagList.filter((tag)=>tag.fields.typeOfTag===1);
    const repTagsType2 = repTagList.filter((tag)=>tag.fields.typeOfTag===2);
    const repTagsType3 = repTagList.filter((tag)=>tag.fields.typeOfTag===3);
    const repTagsType4 = repTagList.filter((tag)=>tag.fields.typeOfTag===4);
    const repTagsType5 = repTagList.filter((tag)=>tag.fields.typeOfTag===5);
    const repTagsType6 = repTagList.filter((tag)=>tag.fields.typeOfTag===6);

    //sort sebmenu lists alphabetically
    repTagsType1.sort(function(a, b) {
      return a.fields.repTag.localeCompare(b.fields.repTag);
    });
    repTagsType2.sort(function(a, b) {
      return a.fields.repTag.localeCompare(b.fields.repTag);
    });
    repTagsType3.sort(function(a, b) {
      return a.fields.repTag.localeCompare(b.fields.repTag);
    });
    repTagsType4.sort(function(a, b) {
      return a.fields.repTag.localeCompare(b.fields.repTag);
    });
    repTagsType5.sort(function(a, b) {
      return a.fields.repTag.localeCompare(b.fields.repTag);
    });
    repTagsType6.sort(function(a, b) {
      return a.fields.repTag.localeCompare(b.fields.repTag);
    });
    
    //return repTag list with submenu checklists
    return (
      <ul className="submenus-ul">
        <li className="submenus-li">
          <button className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setRepTag1SelectionVisibility((curr)=>!curr);
            }}>Racial and Ethnic Identity Tags</button>
            <ul className={setRepTagSubmenu1Classes()}
            id="rep-tag-type-1-selection-list">
              {repTagsType1.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="repTag-select"
                  value={tag.id} onChange={handleRepTagSelection}/>
                  <label htmlFor={tag.id}>{tag.fields.repTag}</label>
                </li>
              ))}
            </ul>
        </li>

        <li className="submenus-li">
          <button className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setRepTag2SelectionVisibility((curr)=>!curr);
            }}>Sexual Orientation and Gender Identity Tags</button>
            <ul className={setRepTagSubmenu2Classes()}
            id="rep-tag-type-2-selection-list">
              {repTagsType2.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="repTag-select"
                  value={tag.id} onChange={handleRepTagSelection}/>
                  <label htmlFor={tag.id}>{tag.fields.repTag}</label>
                </li>
              ))}
            </ul>
        </li>

        <li className="submenus-li">
          <button className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setRepTag3SelectionVisibility((curr)=>!curr);
            }}>Disability Representation Tags</button>
            <ul className={setRepTagSubmenu3Classes()}
            id="rep-tag-type-3-selection-list">
              {repTagsType3.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="repTag-select"
                  value={tag.id} onChange={handleRepTagSelection}/>
                  <label htmlFor={tag.id}>{tag.fields.repTag}</label>
                </li>
              ))}
            </ul>
        </li>

        <li className="submenus-li">
          <button className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setRepTag4SelectionVisibility((curr)=>!curr);
            }}>Body Positivity and Physical Form Representation Tags</button>
            <ul className={setRepTagSubmenu4Classes()}
            id="rep-tag-type-4-selection-list">
              {repTagsType4.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="repTag-select"
                  value={tag.id} onChange={handleRepTagSelection}/>
                  <label htmlFor={tag.id}>{tag.fields.repTag}</label>
                </li>
              ))}
            </ul>
        </li>

        <li className="submenus-li">
          <button className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setRepTag5SelectionVisibility((curr)=>!curr);
            }}>Neurodivergence and Mental Health Representation Tags</button>
            <ul className={setRepTagSubmenu5Classes()}
            id="rep-tag-type-5-selection-list">
              {repTagsType5.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="repTag-select"
                  value={tag.id} onChange={handleRepTagSelection}/>
                  <label htmlFor={tag.id}>{tag.fields.repTag}</label>
                </li>
              ))}
            </ul>
        </li>

        <li className="submenus-li">
          <button className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setRepTag6SelectionVisibility((curr)=>!curr);
            }}>Other Represenation Tags</button>
            <ul className={setRepTagSubmenu6Classes()}
            id="rep-tag-type-6-selection-list">
              {repTagsType6.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="repTag-select"
                  value={tag.id} onChange={handleRepTagSelection}/>
                  <label htmlFor={tag.id}>{tag.fields.repTag}</label>
                </li>
              ))}
            </ul>
        </li>
      </ul>
    )
  }

  //return/render add recommendation form
  return (
    <main>
      <h2>Make a Recommendation</h2>
      <form id="add-rec-form">
        <fieldset id="basic-book-info">
          <label htmlFor="book-title-input">Title: </label>
          <input type="text" id="book-title-input" 
          value={title} onChange={(e)=>setTitle(e.target.value)}required />

          <label htmlFor="book-author-input">Author: </label>
          <input type="text" id="book-author-input" 
          value={author} onChange={(e)=>setAuthor(e.target.value)} required />

          <label htmlFor="book-imgURL-input">Cover Image URL: </label>
          <input type="url" id="book-imgURL-input" 
          value={imageURL} onChange={(e)=>setImageURL(e.target.value)} required />

          <label htmlFor="book-description-input">Book Description: </label>
          <textarea id="book-description-input" rows="5" cols="40" value={description} 
          onChange={(e)=>setDescription(e.target.value)} required />

          <label htmlFor="rec-author-input">Recommendation by: </label>
          <input type="text" id="rec-author-input" 
          value={recAuthor} onChange={(e)=>setRecAuthor(e.target.value)} required />
        </fieldset>

        <fieldset id="tag-selection-lists">
          <ul className="currently-selected-display-ul">
            <span>Currently Selected Genres:</span>
              {selectedGenres.map((genre)=>(
            <li className="currently-selected-display-li">{genre}, </li>))}
          </ul>

          <section id="genre-selection-menu">
            <button 
              className="tag-selection-main-button"
              onClick={(e)=>{
                e.preventDefault();
                setGenreSelectionVisibility((curr)=>!curr);
                }}>Select Genre Tags</button>

            <section id="genre-selection-submenus" 
              className={setGenreSectionClasses()}>
              {createGenreSelectionList()}
              <label htmlFor="genre-input-box">Other Genre:</label>
              <input type="text" id="genre-input-box" 
                onChange={(e) => setCustomGenre(e.target.value)}/>
              <select name="parent-genre-select" id="parent-genre-select" 
                onChange={(e)=>setCustomGenreType(e.target.value)}>
                <option disabled selected value>Select Parent Genre</option>
                <option value="fiction">Fiction</option>
                <option value="nonfiction">Nonfiction</option>
                <option value="poetry/essay">Poetry/Essay</option>
              </select>
              <button id="new-genre-button" className="arrow-button" onClick={checkGenre}>➡️ </button>
            </section>
          </section>


          <section id="authorTag-selection-menu">
            <button className="tag-selection-main-button"
              onClick={(e)=>{
                e.preventDefault();
                setAuthorTagSelectionVisibility((curr)=>!curr);
                }}>Select Author Tags</button>
            <section id="authorTag-selection-submenus" className=  {setAuthorTagSectionClasses()}>
              {createAuthorTagSelectionList()}
              <label htmlFor="authorTag-input-box">Other Representation:</label>
              <input type="text" id="authorTag-input-box"/>
              <select name="authorTag-type-select" id="authorTag-type-select" onChange={(e)=>setCustomRepTagType(e.target.value)}>
                <option disabled selected value>Select Tag Type</option>
                <option value={1}>Racial and Ethnic Identity Representation</option>
                <option value={2}>Sexual Orientation and Gender Representation</option>
                <option value={3}>Disability Representation</option>
                <option value={4}>Body Positivity and Physical Form Representation</option>
                <option value={5}>Neurodivergence and Mental Health Representation</option>
                <option value={6}>Other Representation</option>
              </select>
              <button id="new-author-tag-button" className="arrow-button">➡️ </button>
            </section>
          </section>

          <section id="repTag-selection-menu">
            <button className="tag-selection-main-button"
              onClick={(e)=>{
                e.preventDefault();
                setRepTagSelectionVisibility((curr)=>!curr);
                }}>Select Representation Tags</button>
            <section id="repTag-selection-section" className={setRepTagSectionClasses()}>
              {createRepTagSelectionList()}

              <label htmlFor="repTag-input-box">Other Representation:</label>
              <input type="text" id="repTag-input-box"/>
              <select name="repTag-type-select" id="repTag-type-select" onChange={(e)=>setCustomAuthorTagType(e.target.value)}>
                <option disabled selected value>Select Tag Type</option>
                <option value={1}>Racial and Ethnic Identity Representation</option>
                <option value={2}>Sexual Orientation and Gender Representation</option>
                <option value={3}>Disability Representation</option>
                <option value={4}>Body Positivity and Physical Form Representation</option>
                <option value={5}>Neurodivergence and Mental Health Representation</option>
                <option value={6}>Other Representation</option>
              </select>
              <button id="new-rep-tag-button" className="arrow-button" onClick={checkGenre}>➡️ </button>
            </section>
          </section>

          <section id="theme-and-trigger-input-section">
            <label htmlFor="theme-tag-input">Add theme or topic tag: #</label>
            <input type="text" id="theme-tag-input" />
            <button>➡️ </button>

            <label htmlFor="trigger-warning-input">Add trigger warning: </label>
            <input type="text" id="trigger-warning-input"/>
            <button>➡️ </button>
          </section>
        </fieldset>
      </form>
    </main>
  )
}
export default AddRec;