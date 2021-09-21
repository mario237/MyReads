import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'


class ListBooks extends Component {
    static propTypes = {
        bookshelves: PropTypes.arrayOf(PropTypes.object).isRequired,
        books: PropTypes.arrayOf(PropTypes.object).isRequired,
    }


    changeBookshelf = (option, book) => {
        // Update the data on the backend server
        BooksAPI.update(book, option.value).then((value) => {
            console.log("Update succeeded:  "  + value)
        }).catch((err) => {
            console.log("Updated failed:  " + err)
        })

    }

    render() {
        const { bookshelves, books } = this.props
        let filteredBooks = []
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>My Reads</h1>
                </div>
                <div className="list-books-content">
                    {bookshelves.map((bookshelf) => {
                        filteredBooks = books.filter((book) => book.bookshelf === bookshelf.internalName)
                        return (
                            <Bookshelf
                                key={bookshelf.internalName}
                                bookshelf={bookshelf.title}
                                currentBooks={filteredBooks}
                                onChangeBookshelf={this.changeBookshelf}
                            />
                        )
                    })}
                    <Link
                        to='/search'
                        className="open-search-link"
                    >Add a book</Link>
                </div>
            </div>
        )
    }

}

export default ListBooks
