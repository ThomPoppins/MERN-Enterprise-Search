### To integrate Redux in React and save the `showType` state of `BooksList` to the Redux store, you can follow these steps:

1. Install the necessary dependencies: `redux`, `react-redux`, and `redux-thunk`.

2. Create a new file called `store.js` in your project and set up the Redux store. Here's an example of how you can set up the store:

```javascript
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  showType: 'table',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SHOW_TYPE':
      return {
        ...state,
        showType: action.payload,
      }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store
```

In this example, we're creating a new Redux store with an initial state that includes a `showType` property set to `"table"`. We're also defining a reducer function that handles the `SET_SHOW_TYPE` action, which updates the `showType` property in the state with the value of the `payload` property of the action.

3. Wrap your `App` component with the `Provider` component from `react-redux` and pass in the Redux store as a prop. Here's an example of how you can do this:

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
```

In this example, we're importing the `Provider` component from `react-redux` and the `store` from `store.js`. We're then wrapping our `App` component with the `Provider` component and passing in the `store` as a prop.

4. Modify the `BooksList` component to use the `showType` state from the Redux store instead of the local state. Here's an example of how you can modify the component:

```javascript
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Spinner from '../../components/Spinner'
import { Link } from 'react-router-dom'
import { MdOutlineAddBox } from 'react-icons/md'
import { BACKEND_URL } from '../../../config'
import BooksTable from '../../components/booksList/BooksTable'
import BooksCard from '../../components/booksList/BooksCard'

const BooksList = () => {
  const dispatch = useDispatch()
  const showType = useSelector((state) => state.showType)
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get(BACKEND_URL + '/books')
      .then((response) => {
        setBooks(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [])

  const handleShowTypeChange = (type) => {
    dispatch({ type: 'SET_SHOW_TYPE', payload: type })
  }

  return (
    <div>
      <div>
        <button onClick={() => handleShowTypeChange('table')}>
          Table View
        </button>
        <button onClick={() => handleShowTypeChange('card')}>Card View</button>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
      <Link to='/books/new'>
        <MdOutlineAddBox />
      </Link>
    </div>
  )
}

export default BooksList
```

In this example, we're using the `useSelector` hook from `react-redux` to get the `showType` state from the Redux store. We're also using the `useDispatch` hook to get a reference to the `dispatch` function, which we can use to dispatch actions to the Redux store.

We're then modifying the `handleShowTypeChange` function to dispatch a `SET_SHOW_TYPE` action to the Redux store with the new `showType` value.

Finally, we're using the `showType` state from the Redux store to conditionally render either the `BooksTable` or `BooksCard` component, depending on the value of `showType`.

By following these steps, you can integrate Redux in your React application and save the `showType` state of `BooksList` to the Redux store.

### You can put the `store.js` file in the `/frontend/src/store` folder. This is a common convention for organizing Redux-related files in a React application.

By putting the `store.js` file in the `/frontend/src/store` folder, you can keep all of your Redux-related files in one place and make it easy to find the Redux store when you need to modify it.

Here's an example of how your project structure might look like if you follow this convention:

```
   ├─ frontend
   │  ├─ public
   │  ├─ src
   │  │  ├─ components
   │  │  ├─ pages
   │  │  ├─ store
   │  │  │  ├─ store.js
   │  │  │  └─ reducers.js
   │  │  ├─ App.js
   │  │  ├─ index.js
   │  │  └─ ...
   │  ├─ package.json
   │  └─ ...
   └─ ...
```

In this example, we're putting the `store.js` file in the `/frontend/src/store` folder, along with the `reducers.js` file. We're also organizing our other React-related files in the `/frontend/src` folder.

By following this convention, you can keep your Redux-related files organized and easily accessible to the components that need to use them.
