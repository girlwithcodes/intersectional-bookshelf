import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home(props) {
  return (
    <main>
      <h1>The Intersectional Bookshelf</h1>
      <section id="purpose-statement">
        <p>Hi guys! The Intersectional Bookshelf is a project and very much a work in progress.  It's intended to be for anyone who wants to diversify their reading or share their reading experience with books that have strong representation for people who are underrepresented in popular media and literature.  This project is in its infancy right now, but I will continue to develop it gradually.  In the mean time, if you've read a book that meant something special to you, made you feel seen or heard, or was really memorable for the representation it offered and you'd like to share it, please make a recommnedation :)</p>
      </section>
      <section id="featured-books">
        <div id="featured-book-wrapper">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Disability_Pride_Flag_Ann_Magill_copyrights_waived.png/640px-Disability_Pride_Flag_Ann_Magill_copyrights_waived.png" id="featured-card-background-image"/>
  
          <h3>Celebrating Disability Pride Month</h3>
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