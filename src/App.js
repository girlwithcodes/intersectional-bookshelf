import { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import Nav from './components/Nav';
import Home from './components/Home';
import SearchBrowse from './components/SearchBrowse';
import SearchResults from './components/SearchResults';
import KeywordSearchResults from './components/KeywordSearchResults';
import BrowseResults from './components/BrowseResults';
import BookDetail from './components/BookDetail';
import AddRec from './components/AddRec';
import Footer from './components/Footer';
import { baseURL, config } from './services';
import './styles/App.css';

function App() {
  //set state for bookList and toggleFetch
  const [bookList, setBookList] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [currentFeatured, setCurrentFeatured] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [repTagList, setRepTagList] = useState([]);
  const [authorTagList, setAuthorTagList] = useState([]);
  const [searchObject, setSearchObject] = useState({});
  const [toggleFetch, setToggleFetch] = useState(false);

  //define useEffect with fetchBooks function, run on toggleFetch
  useEffect(()=> {
    //function to fetch book data from Airtable
    const fetchBooks = async() => {
      const url = `${baseURL}/books`;
      //save data
      const resp = await axios.get(url, config);
      setBookList(resp.data.records);
      setFeaturedBooks(resp.data.records.filter((book)=>book.fields.featured==="featured"));
      setCurrentFeatured(resp.data.records.filter((book)=>book.fields.featured==="featured")[0]);
    }

    const fetchGenres = async() => {
      const url = `${baseURL}/genres`;
      //save data
      const resp = await axios.get(url, config);
      setGenreList(resp.data.records);
    }

    const fetchRepTags = async() => {
      const url = `${baseURL}/repTags`;
      //save data
      const resp = await axios.get(url, config);
      setRepTagList(resp.data.records);
    }

    const fetchAuthorTags = async() => {
      const url = `${baseURL}/authorTags`;
      //save data
      const resp = await axios.get(url, config);
      setAuthorTagList(resp.data.records);
    }
    fetchBooks();
    fetchGenres();
    fetchRepTags();
    fetchAuthorTags();
  }, [toggleFetch]);

  return (
    <div className="App">
      <Nav />
      <Route exact path="/">
        <Home featuredBooks={featuredBooks} currentFeatured={currentFeatured} setCurrentFeatured={setCurrentFeatured}/>
      </Route>

      <Route exact path="/browse">
        <SearchBrowse bookList={bookList} setSearchObject={setSearchObject} genreList={genreList} repTagList={repTagList} authorTagList={authorTagList}/>
      </Route>

      <Route path="/browseResults/:tagType?/:id">
        <BrowseResults bookList={bookList} genreList={genreList} repTagList={repTagList} authorTagList={authorTagList}/>
      </Route>

      <Route path="/searchResults">
        <SearchResults searchObject={searchObject} bookList={bookList} genreList={genreList} repTagList={repTagList} authorTagList={authorTagList}/>
      </Route>

      <Route path="/keywordSearchResults/:term">
        <KeywordSearchResults bookList={bookList} genreList={genreList} repTagList={repTagList} authorTagList={authorTagList}/>
      </Route>

      <Route path="/bookDetail/:id">
        <BookDetail bookList={bookList} genreList={genreList} repTagList={repTagList} authorTagList={authorTagList} toggleFetch={toggleFetch} setToggleFetch={setToggleFetch}/>
      </Route>

      <Route path="/recommend/:type">
        <AddRec bookList={bookList} setToggleFetch={setToggleFetch} toggleFetch={toggleFetch}/>
      </Route>

      <Footer />
      
    </div>
  );
}

export default App;
