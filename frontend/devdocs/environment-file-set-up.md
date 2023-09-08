To set up a `.env` file and access environment variables in React components, you can follow these steps:

1. Create a new file in the root of your project called `.env`. This file should contain your environment variables in the format `NAME=value`, with each variable on a new line. For example:

```
API_URL=http://localhost:3000/api
```

2. In your React component, you can access the environment variables using the `process.env` object. For example, to access the `API_URL` variable from the `.env` file, you can use:

```javascript
const apiUrl = process.env.REACT_APP_API_URL;
```

Note that in order to use environment variables in your React application, you need to prefix the variable name with `REACT_APP_`. For example, if you have a variable called `API_URL` in your `.env` file, you should access it in your React application as `process.env.REACT_APP_API_URL`.

Here's an example of how you can use an environment variable in a React component:

```javascript
import React, { useEffect, useState } from "react";
import axios from "axios";

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/data`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return <div>{data}</div>;
};

export default MyComponent;
```

In this example, we're using the `REACT_APP_API_URL` environment variable to construct the URL for the API request. We're also handling the loading state of the component using the `data` state variable and rendering a "Loading..." message while the data is being fetched.