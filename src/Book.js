import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const namedBookshelves = [
    { value: 'currentlyReading', label: 'Currently Reading' },
    { value: 'wantToRead', label: 'Want To Read' },
    { value: 'read', label: 'Read' },
    { value: 'none', label: 'None' },
]

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onChangeBookshelf: PropTypes.func.isRequired,
    }

    findShelf = (book) => {
        let shelf = book.bookshelf
        return namedBookshelves.filter(option => option.value === shelf)
    }

    render() {
        const { book, onChangeBookshelf } = this.props
        const currShelf = this.findShelf(book)

        return (
            <div className="book">
                <div className="book-top">
                    <img className="book-cover" alt="Book cover" src={book.backgroundImage}
                     />

                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-author">{book.author}</div>
                <div className="book-shelf-changer">
                    <Select
                        value={currShelf}
                        aria-label="Select bookshelf for book"
                        controlShouldRenderValue = {true}
                        menuPlacement = "auto"
                        id="bookshelf-select"
                        className="book-shelf-changer"
                        name="bookshelf-select"
                        onChange={option => onChangeBookshelf(option, book)}
                        options={namedBookshelves}
                    />
                </div>
            </div>
        )
    }

}

export default Book
