import BookCard from "../BookCard";

import React, { useState, useEffect } from "react";
import axios from "axios";
import style from ".//styles.module.css";

interface BookListProps {
  searchQuery: string;
  category: string;
  sort: string;
}

const Results: React.FC<BookListProps> = ({ searchQuery, category, sort }) => {
  const [books, setBooks] = useState<any[]>([]);
  const [startIndex, setStartIndex] = useState(30);
  const [totalItems, setTotalItems] = useState(0);
  const [searchResultCount, setSearchResultCount] = useState<number | null>(
    null
  );

  useEffect(() => {
    setBooks([]);
    setSearchResultCount(null);
    if (searchQuery) {
      const fetchBooks = async () => {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}${
            category !== "all" ? `+subject:${category}` : ""
          }&orderBy=${sort}&startIndex=0&maxResults=30&key=AIzaSyDA-2VL_BYZCsJ0tPDJJtmLJrfS-xYhUK0`
        );

        setTotalItems(response.data.totalItems);
        setSearchResultCount(response.data.totalItems);
        if (response.data.items) {
          setBooks(response.data.items);
          setStartIndex(30);
        } else {
          setBooks([]);
        }
      };

      fetchBooks();
    }
  }, [searchQuery, category, sort]);

  const loadMoreBooks = async () => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}${
        category !== "all" ? `+subject:${category}` : ""
      }&orderBy=${sort}&startIndex=${startIndex}&maxResults=30&key=AIzaSyDA-2VL_BYZCsJ0tPDJJtmLJrfS-xYhUK0`
    );

    if (response.data.items) {
      const newBooks = response.data.items.filter(
        (newBook: any) => !books.some((book: any) => book.id === newBook.id)
      );

      setBooks((prevBooks) => [...prevBooks, ...newBooks]);
      setStartIndex((prevStartIndex) => prevStartIndex + 30);
    }
  };

  return (
    <div className={style.bookList}>
      <div className={style.bookListCounter}>
        {searchResultCount !== null && (
          <p className={style.searchResultCount}>
            {searchResultCount} books found
          </p>
        )}
      </div>
      <div className={style.bookListElem}>
        {books.length === 0 ? (
          <p className={style.noSearch}>No search result</p>
        ) : (
          books.map((book: any) => <BookCard key={book.id} book={book} />)
        )}
      </div>
      <div className={style.bookLoadMore}>
        {searchQuery && books.length > 0 && books.length < totalItems && (
          <button onClick={loadMoreBooks} className={style.loadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Results;
