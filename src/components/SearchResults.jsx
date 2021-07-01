import { useState } from 'react';

function SearchResults(props) {
  const [searchObject, setSearchObject] = useState(props.searchObject);
  const bookList = props.bookList;
  const genreSearchTerms = searchObject.genreTerms;
  const repTagSearchTerms = searchObject.repTagTerms;
  const authorTagSearchTerms = searchObject.authorTagTerms;
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
        tagsLC = book.fields.repTagList.map((tag)=>tag.toLowerCase());
        return tagsLC.includes(term);
      });
      repTagMatches = [...repTagMatches, ...tagMatches];
    })
  }

  if(authorTagSearchTerms && authorTagSearchTerms.length!==0) {
    authorTagSearchTerms.forEach((term)=>{
      tagMatches = bookList.filter((book)=> {
        tagsLC = book.fields.authorTagList.map((tag)=>tag.toLowerCase());
        return tagsLC.includes(term);
      });
      authorTagMatches = [...authorTagMatches, ...tagMatches];
    })
  }

  let allMatches = [...repTagMatches, ...authorTagMatches];

  allMatches.forEach((match)=>{
    let bookObject = {};
    let matchRepTagsLC = match.fields.repTagList.map((tag)=>tag.toLowerCase());
    let matchAuthorTagsLC = match.fields.authorTagList.map((tag)=>tag.toLowerCase());

    bookObject.book = match;
    
    bookObject.repTagMatches = matchRepTagsLC.filter((tag)=>repTagSearchTerms.includes(tag));

    bookObject.authorTagMatches = matchAuthorTagsLC.filter((tag)=>authorTagSearchTerms.includes(tag));

    bookObject.numMatches = bookObject.repTagMatches.length + bookObject.authorTagMatches.length;

    resultsObject[match.id] = bookObject;
    })
    console.log(resultsObject);
    return resultsObject;
}

const removeGenreMismatches = (genreList, tagMatchObject) => {
  let filteredObject = {};
  if(genreList && genreList.length!==0) {
    Object.keys(tagMatchObject).forEach((key)=>{
      // console.log(tagMatchObject[key]);
      let genresLC = tagMatchObject[key].book.fields.genreList.map((genre)=>genre.toLowerCase());
      genreList.forEach((genre)=> {
        if(genresLC.includes(genre.toLowerCase())){
          filteredObject[key] = tagMatchObject[key];
        }
      })
    })
    console.log(filteredObject);
  }
}

genreResults = findGenreResults();
tagMatchResults = findTagMatches();
removeGenreMismatches(genreResults, tagMatchResults);

  return (
    <h2>Search Results</h2>
  )
}
export default SearchResults;