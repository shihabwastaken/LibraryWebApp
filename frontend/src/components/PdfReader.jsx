import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const PDFReader = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bookshelf/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pdf-reader-container">
      <h2>{book.title}</h2>
      <h3>{book.author}</h3>

      {/* Responsive iframe container */}
      <div className="iframe-container">
        <iframe
          src={book.pdfLink}
          width="100%"
          height="100%"
          title="PDF Viewer"
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
};

export default PDFReader;
