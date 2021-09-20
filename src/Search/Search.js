import React from 'react'
import {Link} from "react-router-dom"
import PropTypes from 'prop-types'
import Book from '../Book/Book'
import * as BooksAPI from '../BooksAPI'

class Search extends React.Component{

	state = {
    	searchedBooks: []
	}

	searchBooks = (event) => {
		let searchingFor = event.target.value;
		BooksAPI.search(searchingFor).then(data => {
			if(data !== undefined && data.error!=="empty query"){
				this.setState({
	            	searchedBooks: data
	          	});
			}else{
				this.setState({
					searchedBooks: []
				});
			}
      }).catch(error => {})
	}

	render = () => {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to={"/"}>Close</Link>
					<div className="search-books-input-wrapper">
						<input onChange={this.searchBooks} type="text" placeholder="Search by title or author"/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
				  		{this.state.searchedBooks.map( (book,i) => <li key={i}> <Book getBooks={this.props.getBooks} book={book} /> </li> )}
					</ol>
				</div>
			</div>
		);
	}
}

Search.propTypes = {
	getBooks: PropTypes.func
};

export default Search;