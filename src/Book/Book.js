import React from 'react'
import * as BooksApi from '../BooksAPI'
import PropTypes from 'prop-types'

class Book extends React.Component{

	updateBook = (event) => {
		BooksApi.update(this.props.book , event.target.value).then(data => {
			this.props.getBooks();
		}).catch(error => { console.log(error);})
	}

	render(){
		var selected = this.props.book.shelf ? this.props.book.shelf : 'none';
		return (
			<div className="book-style">
				<div className="book-top">
				<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+this.props.book.imageLinks.thumbnail+'")' }}></div>
				<div className="book-shelf-changer">
					<select onChange={this.updateBook} value={selected}>
						<option value="move" disabled>Move to...</option>
						<option value="currentlyReading">Currently Reading</option>
						<option value="wantToRead">Want to Read</option>
						<option value="read">Read</option>
						<option value="none">None</option>
					</select>
				</div>
				</div>
				<div className="book-title">{this.props.book.title}</div>
				<div className="book-authors">{ (this.props.book.authors && this.props.book.authors.length > 1) ? this.props.book.authors.join(',') : this.props.book.authors }</div>
			</div>
		);
	}
}

Book.propTypes = {
	book: PropTypes.object,
	getBooks: PropTypes.func
};

export default Book