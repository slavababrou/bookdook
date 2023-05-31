import styles from ".//styles.module.css";
import { Link } from "react-router-dom";

interface BookCardProps {
  book: any;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Link to={`/book/${book.id}`} className='book-card'>
      <div className={styles.wrapper}>
        <img
          src={book.volumeInfo.imageLinks?.thumbnail}
          alt={book.volumeInfo.title}
        />

        <p className={styles.title}>{book.volumeInfo.title}</p>

        <span className={styles.about}>
          <strong>Category:</strong>{" "}
          {book.volumeInfo.categories?.join(", ") || "N/A"}
        </span>

        <p className={styles.autor}>
          <strong>Author(s):</strong>{" "}
          {book.volumeInfo.authors?.join(", ") || "N/A"}
        </p>
      </div>
    </Link>
  );
};

export default BookCard;
