import React from 'react'
import {Link} from "react-router-dom"
import PropTypes from 'prop-types'
import Book from '../Book/Book'

class Bookshelf extends React.Component{	

	render = () => {
		return (
			<div className="books-list">
			    <div className="books-list-title">
			        <h1>{this.props.title}</h1>
			    </div>
			    <div className="books-list-content">
			        <div>
			            {
			            	this.props.shelvesTitles.map( (shelve,i) => {
				            	return(
					                <div key={i} className="bookshelf">
					                    <h2 className="bookshelf-title">{shelve}</h2>
					                    <div className="bookshelf-books">
					                        <ol className="books-grid">
					                    		{this.props.books.filter( book => book.shelf === shelve ).map( (item,i) => {
													return(
														<li key={i}> <Book getBooks={this.props.getBooks} book={item} /> </li>
													)
					                    		})}
					                        </ol>
					                    </div>
					                </div>
				                )
			            	})
			            }

			        </div>
			    </div>
			    <div className="open-search">
			        <Link to={"/search"}>Add a book</Link>
			    </div>
			</div>
		);
	}
}

Bookshelf.propTypes = {
	title: PropTypes.string,
	shelvesTitles: PropTypes.array,
	getBooks: PropTypes.func
};

export default Bookshelf;