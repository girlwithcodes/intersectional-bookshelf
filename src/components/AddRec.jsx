import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL, config } from '../services';
import '../styles/AddRec.css';

function AddRec(props) {
  const params = useParams();
  const history = useHistory();

  //set state for basic book recommendation information
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [recAuthor, setRecAuthor] = useState("");

  //set state for lists to retrieve from API for selection checklists
  const [genreList, setGenreList] = useState([]);
  const [repTagList, setRepTagList] = useState([]);
  const [authorTagList, setAuthorTagList] = useState([]);
  
  //set state for temporary and final inputs - genre selection
  const [initialGenres, setInitialGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [customGenre, setCustomGenre] = useState("");
  const [customGenreType, setCustomGenreType] = useState("");

  //set state for temporary and final inputs - repTag selection
  const [initialRepTags, setInitialRepTags] = useState([]);
  const [selectedRepTags, setSelectedRepTags] = useState([]);
  const [customRepTag, setCustomRepTag] = useState("");
  const [customRepTagType, setCustomRepTagType] = useState("");

  //set state for temporary and final inputs - authorTag selection
  const [initialAuthorTags, setInitialAuthorTags]= useState([]);
  const [selectedAuthorTags, setSelectedAuthorTags] = useState([]);
  const [customAuthorTag, setCustomAuthorTag] = useState("");
  const [customAuthorTagType, setCustomAuthorTagType] = useState("");

  //set state for temporary and final inputs - themeTag selection
  const [currentThemeTags, setCurrentThemeTags] = useState("");
  const [initialThemeTags, setInitialThemeTags] = useState("");
  const [selectedThemeTags, setSelectedThemeTags] = useState([]);

  //set state for temporary and final inputs - triggerWarning selection
  const [currentTriggerWarnings, setCurrentTriggerWarnings] = useState("");
  const [initialTriggerWarnings, setInitialTriggerWarnings] =useState("");
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
  }, [props.toggleFetch]);

  //handle recommendation submission
  //check if book already exists in database
  //if not, add book to database
  const handleSubmit = async(e) => {
    e.preventDefault();
    props.setToggleFetch((curr)=>!curr);
    const bookID = author.replaceAll(" ","").toLowerCase() + ":" + title.replaceAll(" ", "").toLowerCase();
    const found = props.bookList.find((book)=>book.fields.id===bookID);

    if(found) {
      history.push(`/bookDetail/${found.id}`);
    } else {
      const url = `${baseURL}/books`;

      const bookGenres = genreList.filter((genre)=>selectedGenres.includes(genre.fields.genre));
      const bookGenresByID = bookGenres.map((genre)=>genre.id);
      const finalGenres = [...initialGenres, ...bookGenresByID];

      let bookRepTags = repTagList.filter((tag)=>selectedRepTags.includes(tag.fields.repTag));
      bookRepTags = bookRepTags.map((tag)=>tag.id);
      const finalRepTags = [...initialRepTags, ...bookRepTags];

      let bookAuthorTags = authorTagList.filter((tag)=>selectedAuthorTags.includes(tag.fields.authorTag));
      bookAuthorTags = bookAuthorTags.map((tag)=>tag.id);
      const finalAuthorTags = [...initialAuthorTags, ...bookAuthorTags];

      const finalThemeTags = selectedThemeTags.join(", ");
  
      const finalTriggerWarnings = selectedTriggerWarnings.join(", ");
      
      const newBook = {
        author,
        title,
        description,
        imageURL,
        genres : finalGenres,
        repTags: finalRepTags,
        authorTags: finalAuthorTags,
        themeTags: finalThemeTags,
        triggerWarnings: finalTriggerWarnings,
        recBy: recAuthor,
        reviews: [],
      }
      const resp = await axios.post(url, { fields: newBook }, config);
      const newBookID = resp.data.id;
      setTimeout(()=>{
        history.push(`/bookDetail/${newBookID}`);
      }, 300);
    }

  }

  //adds new genre to genre table if user enters custom genre that is not already in the table
  const addGenre = async(genreToAdd) => {
    const url=`${baseURL}/genres`
    const genre = genreToAdd.toLowerCase();
    const parentGenre = customGenreType;
    const newGenre = { 
      genre,
      parentGenre,
    }
    await axios.post(url, {fields: newGenre}, config);
    props.setToggleFetch((curr)=>!curr);
  }
  
  //check if user-entered custom genre already exists in genre table,
  //call function to add genre if not
  const checkGenre = (e) => {
    e.preventDefault();
    const genresByName=genreList.map((genre)=>genre.fields.genre);
    const customGenreLower = customGenre.toLowerCase();
    setSelectedGenres([...selectedGenres, customGenreLower]);
      setCustomGenre("");
    if(!genresByName.includes(customGenreLower)) {
      addGenre(customGenreLower);
    } 
  }

  //adds new authorTag to authorTag table if user enters custom tag that is not already in the table
  const addAuthorTag = async(tagToAdd) => {
    const url=`${baseURL}/authorTags`
    const authorTag = tagToAdd.toLowerCase();
    const typeOfTag = parseInt(customAuthorTagType);
    const newAuthorTag = {
      authorTag,
      typeOfTag,
    }
    await axios.post(url, { fields: newAuthorTag }, config);
    props.setToggleFetch((curr)=>!curr);
  }

  //check if user-entered custom authorTag already exists in authorTag table,
  //call function to add tag if not
  const checkAuthorTag = (e) => {
    e.preventDefault();
    const authorTagsByTag = authorTagList.map((tag)=>tag.fields.authorTag);
    const customATLower = customAuthorTag.toLowerCase();
    setSelectedAuthorTags([...selectedAuthorTags, customATLower]);
    setCustomAuthorTag("");
    if(!authorTagsByTag.includes(customATLower)) {
      addAuthorTag(customATLower);
    } 
  }

    //adds new repTag to repTag table if user enters custom tag that is not already in the table
    const addRepTag = async(tagToAdd) => {
      const url=`${baseURL}/repTags`
      const repTag = tagToAdd.toLowerCase();
      const typeOfTag = parseInt(customRepTagType);
      const newRepTag = {
        repTag,
        typeOfTag,
      }
      await axios.post(url, { fields: newRepTag }, config);
      props.setToggleFetch((curr)=>!curr);
    }
  
    //check if user-entered custom repTag already exists in repTags table,
    //call function to add tag if not
    const checkRepTag = (e) => {
      e.preventDefault();
      const repTagsByTag = repTagList.map((tag)=>tag.fields.repTag);
      const customRTLower = customRepTag.toLowerCase();
      setSelectedRepTags([...selectedRepTags, customRTLower]);
      setCustomRepTag("");
      if(!repTagsByTag.includes(customRTLower)) {
        addRepTag(customRTLower);
      } 
    }

    //adds user-entered theme tags to book's list of theme tags
    const addToThemeTags = () => {
      let tagsToAdd = currentThemeTags.replaceAll("#", "");
      tagsToAdd = tagsToAdd.toLowerCase();
      const tagsArray = tagsToAdd.split(",");
      const tagsArrayTrimmed = tagsArray.map((tag)=>tag.trim());
      const tagsToAddList = tagsArrayTrimmed.map((tag)=>`#${tag}`);
      setSelectedThemeTags([...selectedThemeTags, ...tagsToAddList]);
      setCurrentThemeTags("");
      props.setToggleFetch((curr)=>!curr);
    }

    //adds user-entered trigger warnings to book's list of trigger warnings
    const addToTriggerWarnings = () => {
      let tagsToAdd = currentTriggerWarnings.replaceAll("#", "");
      tagsToAdd = tagsToAdd.toLowerCase();
      const tagsArray = tagsToAdd.split(",");
      const tagsArrayTrimmed = tagsArray.map((tag)=>tag.trim());
      const tagsToAddList = tagsArrayTrimmed.map((tag)=>`#${tag}`);
      setSelectedTriggerWarnings([...selectedTriggerWarnings, ...tagsToAddList]);
      setCurrentTriggerWarnings("");
      props.setToggleFetch((curr)=>!curr);
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
            <button type="button" className="tag-selection-sub-button" 
              onClick={(e)=>{
                e.preventDefault();
                setFictionSelectionVisibility((curr)=>!curr);
                }}>Fiction Genres ⬇️</button>
            <ul className={setFictionSectionClasses()} id="genre-fiction-selection-list">
              {fictionGenresList.map((genre)=>(
                <li className="selection-tag" key={genre.id}>
                  <input type="checkbox" id={genre.id} name="genre-select"
                  value={genre.fields.genre} onChange={handleGenreSelection} checked={selectedGenres.includes(genre.fields.genre)}/>
                  <label htmlFor={genre.id}>{genre.fields.genre}</label>
                </li>
              ))}
            </ul>
          </li>

          <li className="submenus-li">
            <button type="button" className="tag-selection-sub-button"
              onClick={(e)=>{
                e.preventDefault();
                setNonfictionSelectionVisibility((curr)=>!curr);
                }}>Nonfiction Genres ⬇️</button>
            <ul className={setNonfictionSectionClasses()} id="genre-nonfiction-selection-list">
              {nonfictionGenresList.map((genre)=>(
                <li className="selection-tag" key={genre.id}>
                  <input type="checkbox" id={genre.id} name="genre-select"
                  value={genre.fields.genre} onChange={handleGenreSelection}
                  checked={selectedGenres.includes(genre.fields.genre)}/>
                  <label htmlFor={genre.id}>{genre.fields.genre}</label>
                </li>
              ))}
            </ul>
          </li>

          <li className="submenus-li">
            <button type="button" className="tag-selection-sub-button"
              onClick={(e)=>{
                e.preventDefault();
                setPoetrySelectionVisibility((curr)=>!curr);
                }}>Poetry/Essay Genres ⬇️</button>
            <ul className={setPoetrySectionClasses()} id="genre-poetry-essay-selection-list">
              {poetryEssayGenresList.map((genre)=>(
                <li className="selection-tag" key={genre.id}>
                  <input type="checkbox" id={genre.id} name="genre-select"
                  value={genre.fields.genre} onChange={handleGenreSelection}
                  checked={selectedGenres.includes(genre.fields.genre)}/>
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
          <button type="button" className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setAuthorTag1SelectionVisibility((curr)=>!curr);
            }}>Race and Ethnic Identity ⬇️</button>
            <ul className={setAuthorTagSubmenu1Classes()}
            id="author-tag-type-1-selection-list">
              {authorTagsType1.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="authorTag-select"
                  value={tag.fields.authorTag} onChange={handleAuthorTagSelection}
                  checked={selectedAuthorTags.includes(tag.fields.authorTag)}/>
                  <label htmlFor={tag.id}>{tag.fields.authorTag}</label>
                </li>
              ))}
              
            </ul>
        </li>

        <li className="submenus-li">
          <button type="button" className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setAuthorTag2SelectionVisibility((curr)=>!curr);
            }}>Sexual Orientation and Gender Identity ⬇️</button>
            <ul className={setAuthorTagSubmenu2Classes()}
            id="author-tag-type-2-selection-list">
              {authorTagsType2.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="authorTag-select"
                  value={tag.fields.authorTag} onChange={handleAuthorTagSelection}
                  checked={selectedAuthorTags.includes(tag.fields.authorTag)}/>
                  <label htmlFor={tag.id}>{tag.fields.authorTag}</label>
                </li>
              ))}
            </ul>
        </li>

        <li className="submenus-li">
          <button type="button" className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setAuthorTag3SelectionVisibility((curr)=>!curr);
            }}>Disability  ⬇️</button>
            <ul className={setAuthorTagSubmenu3Classes()}
            id="author-tag-type-3-selection-list">
              {authorTagsType3.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="authorTag-select"
                  value={tag.fields.authorTag} onChange={handleAuthorTagSelection}
                  checked={selectedAuthorTags.includes(tag.fields.authorTag)}/>
                  <label htmlFor={tag.id}>{tag.fields.authorTag}</label>
                </li>
              ))}
            </ul>
        </li>

        <li className="submenus-li">
          <button type="button" className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setAuthorTag4SelectionVisibility((curr)=>!curr);
            }}>Neurodivergence and Mental Health  ⬇️</button>
            <ul className={setAuthorTagSubmenu4Classes()}
            id="author-tag-type-4-selection-list">
              {authorTagsType4.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="authorTag-select"
                  value={tag.fields.authorTag} onChange={handleAuthorTagSelection}
                  checked={selectedAuthorTags.includes(tag.fields.authorTag)}/>
                  <label htmlFor={tag.id}>{tag.fields.authorTag}</label>
                </li>
              ))}
            </ul>
        </li>

        <li className="submenus-li">
          <button type="button" className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setAuthorTag5SelectionVisibility((curr)=>!curr);
            }}>Body Positivity and Physical Form  ⬇️</button>
            <ul className={setAuthorTagSubmenu5Classes()}
            id="author-tag-type-5-selection-list">
              {authorTagsType5.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="authorTag-select"
                  value={tag.fields.authorTag} onChange={handleAuthorTagSelection}
                  checked={selectedAuthorTags.includes(tag.fields.authorTag)}/>
                  <label htmlFor={tag.id}>{tag.fields.authorTag}</label>
                </li>
              ))}
            </ul>
        </li>

        <li className="submenus-li">
          <button type="button" className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setAuthorTag6SelectionVisibility((curr)=>!curr);
            }}>Other Represenation ⬇️</button>
            <ul className={setAuthorTagSubmenu6Classes()}
            id="author-tag-type-6-selection-list">
              {authorTagsType6.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="authorTag-select"
                  value={tag.fields.authorTag} onChange={handleAuthorTagSelection}
                  checked={selectedAuthorTags.includes(tag.fields.authorTag)}/>
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
          <button type="button" className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setRepTag1SelectionVisibility((curr)=>!curr);
            }}>Race and Ethnic Identity ⬇️</button>
            <ul className={setRepTagSubmenu1Classes()}
            id="rep-tag-type-1-selection-list">
              {repTagsType1.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="repTag-select"
                  value={tag.fields.repTag} onChange={handleRepTagSelection}
                  checked={selectedRepTags.includes(tag.fields.repTag)}/>
                  <label htmlFor={tag.id}>{tag.fields.repTag}</label>
                </li>
              ))}
            </ul>
        </li>

        <li className="submenus-li">
          <button type="button" className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setRepTag2SelectionVisibility((curr)=>!curr);
            }}>Sexual Orientation and Gender Identity ⬇️</button>
            <ul className={setRepTagSubmenu2Classes()}
            id="rep-tag-type-2-selection-list">
              {repTagsType2.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="repTag-select"
                  value={tag.fields.repTag} onChange={handleRepTagSelection}
                  checked={selectedRepTags.includes(tag.fields.repTag)}/>
                  <label htmlFor={tag.id}>{tag.fields.repTag}</label>
                </li>
              ))}
            </ul>
        </li>

        <li className="submenus-li">
          <button type="button" className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setRepTag3SelectionVisibility((curr)=>!curr);
            }}>Disability  ⬇️</button>
            <ul className={setRepTagSubmenu3Classes()}
            id="rep-tag-type-3-selection-list">
              {repTagsType3.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="repTag-select"
                  value={tag.fields.repTag} onChange={handleRepTagSelection}
                  checked={selectedRepTags.includes(tag.fields.repTag)}/>
                  <label htmlFor={tag.id}>{tag.fields.repTag}</label>
                </li>
              ))}
            </ul>
        </li>

        <li className="submenus-li">
          <button type="button" className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setRepTag4SelectionVisibility((curr)=>!curr);
            }}>Neurodivergence and Mental Health  ⬇️</button>
            <ul className={setRepTagSubmenu4Classes()}
            id="rep-tag-type-4-selection-list">
              {repTagsType4.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="repTag-select"
                  value={tag.fields.repTag} onChange={handleRepTagSelection}
                  checked={selectedRepTags.includes(tag.fields.repTag)}/>
                  <label htmlFor={tag.id}>{tag.fields.repTag}</label>
                </li>
              ))}
            </ul>
        </li>

        <li className="submenus-li">
          <button type="button" className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setRepTag5SelectionVisibility((curr)=>!curr);
            }}>Body Positivity and Physical Form Representation ⬇️</button>
            <ul className={setRepTagSubmenu5Classes()}
            id="rep-tag-type-5-selection-list">
              {repTagsType5.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="repTag-select"
                  value={tag.fields.repTag} onChange={handleRepTagSelection}
                  checked={selectedRepTags.includes(tag.fields.repTag)}/>
                  <label htmlFor={tag.id}>{tag.fields.repTag}</label>
                </li>
              ))}
            </ul>
        </li>

        <li className="submenus-li">
          <button type="button" className="tag-selection-sub-button" 
            onClick={(e)=>{
              e.preventDefault();
              setRepTag6SelectionVisibility((curr)=>!curr);
            }}>Other Represenation ⬇️</button>
            <ul className={setRepTagSubmenu6Classes()}
            id="rep-tag-type-6-selection-list">
              {repTagsType6.map((tag)=> (
                <li className="selection-tag" key={tag.id}>
                  <input type="checkbox" id={tag.id} name="repTag-select"
                  value={tag.fields.repTag} onChange={handleRepTagSelection}
                  checked={selectedRepTags.includes(tag.fields.repTag)}/>
                  <label htmlFor={tag.id}>{tag.fields.repTag}</label>
                </li>
              ))}
            </ul>
        </li>
      </ul>
    )
  }

  const removeTag = (tagType, tagToRemove) => {
    switch(tagType) {
      case "theme":
        setSelectedThemeTags(selectedThemeTags.filter((tag)=>tag!==tagToRemove));
        break;
      case "trigger":
        setSelectedTriggerWarnings(selectedTriggerWarnings.filter((tag)=>tag!==tagToRemove));
        break;
    }
    props.setToggleFetch((curr)=>!curr);
  }
  //return/render add recommendation form
  return (
    <main>
      <h2>Make a Recommendation</h2>
      <form id="add-rec-form" onSubmit={handleSubmit}>
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

        <fieldset id="tag-selection-dropdowns">

          <section id="genre-selection-menu">
            <button type="button"
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
                value={customGenre}
                onChange={(e) => setCustomGenre(e.target.value)}/>
              <select name="parent-genre-select" id="parent-genre-select" 
                onChange={(e)=>setCustomGenreType(e.target.value)}>
                <option disabled selected value>Select Parent Genre</option>
                <option value="fiction">Fiction</option>
                <option value="nonfiction">Nonfiction</option>
                <option value="poetry/essay">Poetry/Essay</option>
              </select>
              <button type="button" id="new-genre-button" 
                className="arrow-button" onClick={checkGenre}>➡️ </button>
            </section>
          </section>

          <section id="authorTag-selection-menu">
            <button type="button" className="tag-selection-main-button"
              onClick={(e)=>{
                e.preventDefault();
                setAuthorTagSelectionVisibility((curr)=>!curr);
                }}>Select Author Tags</button>
            <section id="authorTag-selection-submenus" className=  {setAuthorTagSectionClasses()}>
              {createAuthorTagSelectionList()}
              <label htmlFor="authorTag-input-box">Other Representation:</label>
              <input type="text" id="authorTag-input-box"
                value={customAuthorTag} onChange={(e)=>setCustomAuthorTag(e.target.value)}/>
              <select name="authorTag-type-select" id="authorTag-type-select" onChange={(e)=>setCustomAuthorTagType(e.target.value)}>
                <option disabled selected value>Select Tag Type</option>
                <option value={1}>Race and Ethnic Identity </option>
                <option value={2}>Sexual Orientation and Gender Identity</option>
                <option value={3}>Disability</option>
                <option value={4}>Neurodivergence and Mental Health </option>
                <option value={5}>Body Positivity and Physical Form</option>
                <option value={6}>Other Representation</option>
              </select>
              <button type="button" id="new-author-tag-button" 
                className="arrow-button" onClick={checkAuthorTag}>➡️ </button>
            </section>
          </section>

          <section id="repTag-selection-menu">
            <button type="button" className="tag-selection-main-button"
              onClick={(e)=>{
                e.preventDefault();
                setRepTagSelectionVisibility((curr)=>!curr);
                }}>Select Representation Tags</button>
            <section id="repTag-selection-section" className={setRepTagSectionClasses()}>
              {createRepTagSelectionList()}

              <label htmlFor="repTag-input-box">Other Representation:</label>
              <input type="text" id="repTag-input-box"
                value={customRepTag} onChange={(e)=>setCustomRepTag(e.target.value)}/>
              <select name="repTag-type-select" id="repTag-type-select" onChange={(e)=>setCustomRepTagType(e.target.value)}>
                <option disabled selected value>Select Tag Type</option>
                <option value={1}>Race and Ethnic Identity</option>
                <option value={2}>Sexual Orientation and Gender Identity</option>
                <option value={3}>Disability </option>
                <option value={4}>Neurodivergence and Mental Health </option>
                <option value={5}>Body Positivity and Physical Form  </option>
                <option value={6}>Other Representation</option>
              </select>
              <button type="button" id="new-rep-tag-button" 
                className="arrow-button" onClick={checkRepTag}>➡️ </button>
            </section>
          </section>
        </fieldset>

        <fieldset id="theme-and-trigger-inputs">
          <section id="theme-and-trigger-input-section">
            <p>You may enter mutliple tags separated by commas</p>
            <label htmlFor="theme-tag-input">Add theme or topic tag: #</label>
            <input type="text" id="theme-tag-input" value={currentThemeTags} onChange={(e)=>setCurrentThemeTags(e.target.value)}/>
            <button type="button" onClick={addToThemeTags}>➡️ </button>

            <label htmlFor="trigger-warning-input">Add trigger warning: </label>
            <input type="text" id="trigger-warning-input" value={currentTriggerWarnings} onChange={(e)=> setCurrentTriggerWarnings(e.target.value)}/>
            <button type="button" onClick={addToTriggerWarnings}>➡️ </button>
          </section>
        </fieldset>
          <section id="current-tag-selections-lists">
            <h4 id="current-tags-title">Current Tag Selections</h4>
            <ul className="currently-selected-display-ul">
              <span>Genres:</span>
                {selectedGenres.map((genre)=>(
              <li key={genre} className="currently-selected-display-li">{genre} </li>))}
            </ul>

            <ul className="currently-selected-display-ul">
              <span>Author Tags:</span>
                {selectedAuthorTags.map((tag)=>(
              <li key={tag} className="currently-selected-display-li">{tag} </li>))}
            </ul>

            <ul className="currently-selected-display-ul">
              <span>Representation Tags:</span>
                {selectedRepTags.map((tag)=>(
              <li key={tag} className="currently-selected-display-li">{tag} </li>))}
            </ul>

            <ul className="currently-selected-display-ul">
              <span>Theme/Topic Tags:</span>
                {selectedThemeTags.map((tag)=>(
              <li key={tag} className="currently-selected-display-li current-theme-trigger-li"
                onClick={()=>removeTag("theme", tag)}>{tag} </li>))}
            </ul>

            <ul className="currently-selected-display-ul">
              <span>Trigger Warnings:</span>
                {selectedTriggerWarnings.map((tag)=>(
              <li key={tag} className="currently-selected-display-li current-theme-trigger-li"
                onClick={()=>removeTag("trigger", tag)}>{tag} </li>))}
            </ul>
          </section>
        <button type="submit" id="submit-rec-button">Submit</button>
      </form>
    </main>
  )
}
export default AddRec;