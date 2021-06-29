import { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import Nav from './components/Nav';
import Home from './components/Home';
import SearchBrowse from './components/SearchBrowse';
import Footer from './components/Footer';
import { baseURL, config } from './services';
import './styles/App.css';

function App() {
  //set state for bookList and toggleFetch
  const [bookList, setBookList] = useState([]);
  const [toggleFetch, setToggleFetch] = useState(false);

  //define useEffect with fetchBooks function, run on toggleFetch
  useEffect(()=> {
    //function to fetch book data from Airtable
    const fetchBooks = async() => {
      //save data
      const resp = await axios.get(baseURL, config);
      console.log(resp);
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

      <Route path="/browse">
        <SearchBrowse bookList={bookList}/>
      </Route>
      <Route path="/recommend">
        
      </Route>

      <Footer />
      
    </div>
  );
}

export default App;
