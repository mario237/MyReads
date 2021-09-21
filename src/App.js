import React, { Component } from 'react'
import BookStore from './BookStore'


class BooksApp extends Component {

    render() {
        return (
            <div>
                <BookStore />
            </div>
        ) // end of return()
    } //end of render()
} // end of class declaration

export default BooksApp
