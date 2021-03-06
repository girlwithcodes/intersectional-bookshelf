import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/BrowseAndSearchResults.css';

function SearchResults(props) {
  const bookList = props.bookList;
  const genreSearchTerms = props.searchObject.genreTerms;
  const repTagSearchTerms = props.searchObject.repTagTerms;
  const authorTagSearchTerms = props.searchObject.authorTagTerms;
  let finalMatchList = [];
  let finalMatchObject = {};
  let genreResults;
  let tagMatchResults;
  

  const findGenreResults = () => {
    let genreBookResults = [];
    let booksInGenre;
    let bookGenresLC;
    if(genreSearchTerms && genreSearchTerms.length !== 0) {
      const genreSearchTermsLC = genreSearchTerms.map((genre)=> {
        return genre.toLowerCase();
      }); 
      genreSearchTermsLC.forEach((term)=> {
        booksInGenre = bookList.filter((book) => {
          bookGenresLC = book.fields.genreList.map((genre)=> genre.toLowerCase());
          return bookGenresLC.includes(term);
        });
        genreBookResults = [...genreBookResults, ...booksInGenre];
      })
    }
    return genreBookResults;
  }

  const findTagMatches = () => {
    let resultsObject = {};
    let repTagMatches = [];
    let authorTagMatches = [];
    let tagMatches;
    let tagsLC;
  
  if(repTagSearchTerms && repTagSearchTerms.length!==0) {
    repTagSearchTerms.forEach((term)=>{
      tagMatches = bookList.filter((book)=> {
        if(book.fields.repTagList && book.fields.repTagList.length!==0) {
          tagsLC = book.fields.repTagList.map((tag)=>tag.toLowerCase());
          return tagsLC.includes(term);
        } else {
          return false;
        } 
      });
      repTagMatches = [...repTagMatches, ...tagMatches];
    })
  }

  if(authorTagSearchTerms && authorTagSearchTerms.length!==0) {
    authorTagSearchTerms.forEach((term)=>{
      tagMatches = bookList.filter((book)=> {
        if(book.fields.authorTagList && book.fields.authorTagList.length!==0) {
          tagsLC = book.fields.authorTagList.map((tag)=>tag.toLowerCase());
          return tagsLC.includes(term);
        } else {
          return false;
        }
        
      });
      authorTagMatches = [...authorTagMatches, ...tagMatches];
    })
  }

  let allMatches = [...repTagMatches, ...authorTagMatches];

  allMatches.forEach((match)=>{
    let bookObject = {};
    let matchRepTagsLC=[];
    let matchAuthorTagsLC = [];

    if(match.fields.repTagList && match.fields.repTagList.length!==0) {
      matchRepTagsLC = match.fields.repTagList.map((tag)=>tag.toLowerCase());
    }

    if(match.fields.authorTagList && match.fields.authorTagList.length!==0) {
      matchAuthorTagsLC = match.fields.authorTagList.map((tag)=>tag.toLowerCase());
    }

    bookObject.book = match;
    
    bookObject.repTagMatches = matchRepTagsLC.filter((tag)=>repTagSearchTerms.includes(tag));

    bookObject.authorTagMatches = matchAuthorTagsLC.filter((tag)=>authorTagSearchTerms.includes(tag));

    bookObject.numMatches = bookObject.repTagMatches.length + bookObject.authorTagMatches.length;

    resultsObject[match.id] = bookObject;
    })
    return resultsObject;
  }

  const removeGenreMismatches = (genreMatchObjectList, tagMatchObjectList) => {
    if(genreMatchObjectList && genreMatchObjectList.length!==0){
      let finalMatchObject = {};
      const genreMatchIDs = genreMatchObjectList.map((book)=>book.id);
      Object.keys(tagMatchObjectList).forEach((key)=> {
        if(genreMatchIDs.includes(key)){
          finalMatchObject[key] = tagMatchObjectList[key];
        }
      })
      return finalMatchObject;
    }
    return tagMatchObjectList;
  }

  const createTagList = (book, typeOfTag) => {
    switch(typeOfTag) {
      case "author":
        if(book.fields.authorTagList && book.fields.authorTagList.length!==0) {
          return (
            <ul className="book-tag-display-list">
              <span>author representation tags: </span>
              {book.fields.authorTagList.map((tag) => (
                <li key={book.fields.authorTagList.indexOf(tag)}className="results-display-tag-item">
                  {tag} 
                </li>
              ))}
            </ul>
          );
        } else {
          return (
            <p>author representation tags: none found</p>
          );
        }

      break;
      case "rep":
        if(book.fields.repTagList && book.fields.repTagList.length!==0) {
          return (
            <ul className="book-tag-display-list">
              <span>representation tags: </span>
              {book.fields.repTagList.map((tag) => (
                <li key={book.fields.repTagList.indexOf(tag)}className="results-display-tag-item">
                  {tag} 
                </li>
              ))}
            </ul>
          );
        } else {
          return (
            <p>representation tags: none found</p>
          )
        }
      break;
    }  
  }

  genreResults = findGenreResults();
  tagMatchResults = findTagMatches();
  finalMatchObject = removeGenreMismatches(genreResults, tagMatchResults);
  finalMatchList = genreResults;
  
  if((!repTagSearchTerms || repTagSearchTerms.length===0) && (!authorTagSearchTerms || authorTagSearchTerms.length===0)) {
    return (
      <main className="search-results-main">
        <h2>Search Results</h2>
        <ul className="book-matches-list">
          {genreResults.map((match)=> (
            <Link to={`/bookDetail/${match.id}`} key={match.id}>
              <li>
                <div className="book-match-div">
                  <img className="results-list-image" src={match.fields.imageURL}/>
                  <div className="book-results-info-div">
                    <h4>{match.fields.title}</h4>
                    <p>by {match.fields.author}</p>
                    <div>
                      {createTagList(match, "author")}
                      {createTagList(match, "rep")}
                    </div>

                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </main> 
    )
  } else {
    finalMatchList = Object.values(finalMatchObject);
    finalMatchList.sort((a, b) => b.numMatches - a.numMatches);
    return (
      <main>
        <h2>Search Results</h2>
        <ul className="book-matches-list">
          {finalMatchList.map((match)=> (
            <Link to={`/bookDetail/${match.book.id}`} key={match.book.id}>
              <li>
                <div className="book-match-div">
                  <img className="results-list-image" src={match.book.fields.imageURL}/>
                  <div className="book-results-info-div">
                    <h6>{match.book.fields.title}</h6>
                    <div>
                      {match.book.fields.author}
                      {createTagList(match.book, "author")}
                    </div>
                    {createTagList(match.book, "rep")}
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </main>
    )
  }
}

export default SearchResults;