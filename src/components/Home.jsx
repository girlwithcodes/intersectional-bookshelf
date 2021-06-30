import { Link } from 'react-router-dom';

function Home(props) {
  return (
    <main>
      <h1>The Intersectional Bookshelf</h1>
      <section id="featured-books">
        <h3>Featured</h3>
      </section>
      <section id="purpose-statement">
        <p>The Intersectional Bookshelf is about finding literature that reflects the human diversity of experience and identity that is lacking in mainstream media.  It's about creating a bookshelf that represents us ALL.</p>
      </section>
      <section id="home-page-links">
        <Link to="/browse">
          Browse Books
        </Link>
        <Link to="/recommend">
          Recommend a Book
        </Link>
      </section>
    </main>
  )
}
export default Home;