import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'


const Bookshelf = props =>{

    const { bookshelf, currentBooks, onChangeBookshelf } = props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{bookshelf}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid" id="bookshelf">
                        {currentBooks.map((book) => {
                            return (<li key={book.id} id={book.id}>
                                <Book
                                    book={book}
                                    onChangeBookshelf={onChangeBookshelf}
                                />
                            </li>)
                        })}
                    </ol>
                </div>
            </div>
        )
}

Bookshelf.PropTypes = {
    bookshelf: PropTypes.string.isRequired,
    currentBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChangeBookshelf: PropTypes.func.isRequired,
}

export default Bookshelf
