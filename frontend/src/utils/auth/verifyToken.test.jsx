import axios from 'axios'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { USER_ID, USER } from '../../store/actions.jsx'
import verifyToken from './verifyToken'

// Mock Redux store
const mockStore = configureMockStore([thunk])

// Mock axios
jest.mock('axios')

//
describe('verifyToken', () => {
  let store

  beforeEach(() => {
    store = mockStore({
      user: null,
      userId: null,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should dispatch USER_ID and USER actions with correct payload when token is valid', async () => {})

  it('should dispatch USER_ID and USER actions with null payload when token is invalid', async () => {
    const token = 'invalid_token'

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error('Invalid token')),
    )

    await store.dispatch(verifyToken(token))

    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: USER_ID,
      payload: null,
    })

    expect(actions[1]).toEqual({
      type: USER,
      payload: null,
    })
  })
})
