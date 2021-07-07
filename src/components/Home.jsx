import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FeaturedCard from './FeaturedCard';
import '../styles/Home.css';

function Home(props) {
  

  const nextFeatured = () => {
    const curIndex=props.featuredBooks.indexOf(props.currentFeatured);
    if(curIndex < props.featuredBooks.length-1) {
      props.setCurrentFeatured(props.featuredBooks[curIndex+1]);
    } else {
      props.setCurrentFeatured(props.featuredBooks[0]);
    }
  }

  const previousFeatured = () => {
    const curIndex=props.featuredBooks.indexOf(props.currentFeatured);
    if(curIndex > 0) {
      props.setCurrentFeatured(props.featuredBooks[curIndex-1]);
    } else {
      props.setCurrentFeatured(props.featuredBooks[props.featuredBooks.length-1]);
    }
  }

  return (
    <main>
      <h1>The Intersectional Bookshelf</h1>
      <section id="purpose-statement">
        <p>Hi guys! The Intersectional Bookshelf is a project and very much a work in progress.  It's intended to be for anyone who wants to diversify their reading or share their reading experience with books that have strong representation for people who are underrepresented in popular media and literature.  This project is in its infancy right now, but I will continue to develop it gradually.  In the mean time, if you've read a book that meant something special to you, made you feel seen or heard, or was really memorable for the representation it offered and you'd like to share it, please make a recommnedation :)</p>
      </section>
      <section id="featured-books">
        <h3>Featured Books</h3>
        <div id="featured-book-wrapper">
          <h3>Celebrating Disability Pride Month</h3>
  
          <div id="featured-card-carousel">
            <FeaturedCard book={props.currentFeatured} />
          </div>
          <div id="featured-card-arrow-buttons">
            <button type="button" className="cycle-featured-button" onClick={previousFeatured}> ⬅️</button>
            <button type="button" className="cycle-featured-button"  onClick={nextFeatured}> ➡️  </button>
          </div>
        </div>
      </section>
      <section id="home-page-links">
        <Link to="/browse">
          <button className="homepage-link-buttons">Browse Books</button>
        </Link>
        <Link to="/recommend/newRec">
          <button className="homepage-link-buttons">Recommend a Book</button>
        </Link>
      </section>
    </main>
  )
}
export default Home;