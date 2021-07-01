import { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import Nav from './components/Nav';
import Home from './components/Home';
import SearchBrowse from './components/SearchBrowse';
import SearchResults from './components/SearchResults';
import BrowseResults from './components/BrowseResults';
import Footer from './components/Footer';
import { baseURL, config } from './services';
import './styles/App.css';

function App() {
  //set state for bookList and toggleFetch
  const [bookList, setBookList] = useState([]);
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
    }
    fetchBooks();
  }, [toggleFetch]);

  return (
    <div className="App">
      <Nav />
      <Route exact path="/">
        <Home bookList={bookList} />
      </Route>

      <Route exact path="/browse">
        <SearchBrowse bookList={bookList} setSearchObject={setSearchObject}/>
      </Route>

      <Route path="/browseResults/:id">
        <BrowseResults bookList={bookList}/>
      </Route>

      <Route path="/searchResults">
        <SearchResults searchObject={searchObject}/>
      </Route>

      <Route path="/recommend">
      </Route>

      <Footer />
      
    </div>
  );
}

export default App;
