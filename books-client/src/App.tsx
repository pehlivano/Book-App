import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { IBook } from './Models/interface';

function App() {

  const [books, setBooks] = React.useState<IBook[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await axios.get<IBook[]>('http://localhost:3010/books');
      setBooks(response.data);
    }
    fetchData()
  }, []);

  return (
    <div>
      <h1>Books</h1>
      {books == null ? <div>Loading...</div> : books.map(book => <div key={book.title}>{book.title}</div>)}
    </div>
  );
}

export default App;
