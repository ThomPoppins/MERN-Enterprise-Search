### To set up a `.env` file and use environment variables in `HomeBooks.js`, you can follow these steps:

1. Create a new file in the root of your project called `.env`. This file should contain your environment variables in the format `NAME=value`, with each variable on a new line. For example:

```
API_URL=http://localhost:3000/api
```

2. In `HomeBooks.js`, you can access the environment variables using the `process.env` object. For example, to access the `API_URL` variable from the `.env` file, you can use:

```javascript
const apiUrl = process.env.API_URL;
```

3. Note that in order to use environment variables in your React application, you need to prefix the variable name with `REACT_APP_`. For example, if you have a variable called `API_URL` in your `.env` file, you should access it in your React application as `process.env.REACT_APP_API_URL`.

Here's an example of how you can use an environment variable in `HomeBooks.js`:

```javascript
import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const HomeBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/books`)
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Books</h1>
      <Link to="/books/add">
        <MdOutlineAddBox /> Add Book
      </Link>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <Link to={`/books/${book._id}`}>
              {book.title} ({book.author})
            </Link>
            <Link to={`/books/edit/${book._id}`}>
              <AiOutlineEdit />
            </Link>
            <Link to={`/books/${book._id}`}>
              <BsInfoCircle />
            </Link>
            <button>
              <MdOutlineDelete />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeBooks;
```

In this example, we're using the `REACT_APP_API_URL` environment variable to construct the URL for the API request. Note that we're also handling the loading state of the component using the `loading` state variable and rendering a `Spinner` component while the data is being fetched.