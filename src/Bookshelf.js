import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {
    static propTypes = {
        bookshelf: PropTypes.string.isRequired,
        currentBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
        onChangeBookshelf: PropTypes.func.isRequired,
    }

    render() {
        const { bookshelf, currentBooks, onChangeBookshelf } = this.props

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
}

export default Bookshelf
