import React from 'react'
import {BrowserRouter, Route} from "react-router-dom"
import Bookshelf from './Bookshelf/Bookshelf'
import Search from './Search/Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
      books: []
  }

  getBooks = () => {
    BooksAPI.getAll().then(data => {
        this.setState({
            books: data
        });
    }).catch(error => {})
  }

  componentDidMount = () =>{
    this.getBooks();
  }

  render = () => {
    const shelvesTitles = [...new Set(this.state.books.map(book => book.shelf))];
    const props = {
        "shelvesTitles": shelvesTitles,
        "books": this.state.books,
        "title": "My reads",
        "getBooks": this.getBooks
    }

    return (
        <BrowserRouter>
            <div className="app">
                <Route path="/search" exact render={()=>(
                    <Search getBooks={this.getBooks} />
                )} />

                <Route path="/" exact render={()=>(
                    <Bookshelf {...props} />
                )} />
            </div>
        </BrowserRouter>      
    )
  } 
}
export default BooksApp
