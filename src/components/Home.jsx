import { Link } from 'react-router-dom';

function Home(props) {
  return (
    <main>
      <h1>The Intersectional Bookshelf</h1>
      <section id="featured-books">
        <h3>Featured</h3>
      </section>
      <section id="purpose-statement">
        <p>Hi guys! The Intersectional Bookshelf is a project and very much a work in progress.  It's intended to be for anyone who wants to diversify their reading or share their reading experience with books that have strong representation for people who are underrepresented in popular media and literature.  This project is in its infancy right now, but I will continue to develop it gradually.  In the mean time, if you've read a book that meant something special to you, made you feel seen or heard, or was really memorable for the representation it offered and you'd like to share it, please make a recommnedation :)</p>
      </section>
      <section id="home-page-links">
        <Link to="/browse">
          Browse Books
        </Link>
        <Link to="/recommend/newRec">
          Recommend a Book
        </Link>
      </section>
    </main>
  )
}
export default Home;