import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import escapeStringRegExp from 'escape-string-regexp'
import PropTypes from 'prop-types'


class SearchBooks extends Component {
    static propTypes = {
        savedBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
        onFormatBook: PropTypes.func.isRequired,
    }

    state = {
        query: '',
        foundBooks: [],
        resultsFound: true,
    }

    changeBookshelf = (option, book) => {
        let index
        // Update the data on the backend server
        BooksAPI.update(book, option.value).then((value) => {
            console.log("Update succeeded:  "  + value)
        }).catch((err) => {
            console.log("Updated failed:  " + err)
        })
        // Update the foundBooks state with the new bookshelf
        for (let i = 0; i < this.state.foundBooks.length; ++i) {
            if (this.state.foundBooks[i].id === book.id) {
                index = i
                break
            }
        }
        // Setting state with new bookshelf
        this.setState((prev) => {
            let newList = [...prev.foundBooks]
            newList[index] = {...newList[index], bookshelf: option.value }
            return {foundBooks: newList}
        })
    }

    findMatchingBook = (book)=> {
        let i
        for (i = 0; i < this.props.savedBooks.length; ++i) {
            if (book.id === this.props.savedBooks[i].id) {
                return this.props.savedBooks[i]
            }
        }
        return undefined
    }

    submitQuery = (foundBooks, newQuery) => {
        if (newQuery) {
            this.setState({ query: newQuery })

        } else {
            this.setState({
                query: newQuery,
                foundBooks: [],
                resultsFound: true})
            return
        }

        const match = escapeStringRegExp(newQuery)

        BooksAPI.search(match)
            .then((value) => {
                if (value.error) {
                    this.setState({
                        resultsFound: false,
                        foundBooks: [],
                    })

                } else {
                    this.setState({resultsFound: true})
                    let tempBooks = value.map((book) => {
                        let nextBook = this.props.onFormatBook(book)

                        // Check to see if we have this book already
                        let matchingBook = this.findMatchingBook(book)

                        // if we found a match, use it instead
                        if (matchingBook) {
                            return (matchingBook)
                        }
                        return (nextBook)
                    })
                    this.setState({foundBooks: tempBooks})
                }
            }) //end of BooksAPI search then
            .catch ((err)  => {
                console.log(err)
            })
    } // end of submitQuery method

    render () {
        const { query, foundBooks, resultsFound } = this.state

        return (
            <div className="search-books">
                <div className="list-books-title">
                    <h1>My Reads</h1>
                </div>
                <div className="search-books-bar">
                    <Link
                        to="/"
                        className="close-search"
                    >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search for books"
                            value={query}
                            autoFocus={true}
                            onChange={(evt) => this.submitQuery(foundBooks, evt.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results" id="search-results">
                    {!resultsFound && <p>No search results have been found.</p>}
                    <Bookshelf
                        bookshelf="Search Results"
                        currentBooks={foundBooks}
                        onChangeBookshelf={this.changeBookshelf}
                    />
                </div>
            </div>

        )
    }
}

export default SearchBooks
