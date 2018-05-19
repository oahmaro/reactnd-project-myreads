import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from './BooksAPI';
import BookList from './components/BookList';
import { Link } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks() {
    BooksAPI.getAll().then((response) => {   
      this.setState(() => ({
        books: response
      }))
    })
  }

  moveBook = (book, shelf) => {
    if(shelf !== book.shelf) {
      BooksAPI.update(book, shelf).then((response) => {
        this.getBooks()
      })
    }
  }

  render() {
    return (
      <div className="app">
        <BookList 
          books={this.state.books} 
          onBookMove={this.moveBook}
          />

        <div className="open-search">
              <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksApp
