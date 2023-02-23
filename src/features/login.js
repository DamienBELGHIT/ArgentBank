import { selectLogin } from "../utils/selectors"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  status: "void",
  data: null,
  error: null,
  credentials: null,
}

export function fetchLogin(credentials) {
  //thunk
  return async (dispatch, getState) => {
    const login = selectLogin(getState())
    if (login.status === "void" || login.credentials !== credentials) {
      dispatch(actions.fetching(credentials))
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/user/login",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        )
        if (!response.ok) {
          throw new Error(`status code ${response.status}`)
        }
        const data = await response.json()
        dispatch(actions.resolved(credentials, data))
      } catch (error) {
        dispatch(actions.rejected(credentials, error.toString()))
      }
    }
  }
}

const { actions, reducer } = createSlice({
  name: "login",
  initialState,
  reducers: {
    fetching: {
      prepare: (credentials) => ({
        payload: { credentials },
      }),
      reducer: (draft, action) => {
        const credentials = action.payload.credentials
        if (draft.status === "void") {
          draft.status = "pending"
          draft.credentials = credentials
          return
        }
        draft.status = "updating"
        draft.credentials = credentials
      },
    },

    resolved: {
      prepare: (credentials, data) => ({
        payload: { credentials, data },
      }),
      reducer: (draft, action) => {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.data = action.payload.data
          draft.status = "resolved"
          return
        }
        return
      },
    },

    rejected: {
      prepare: (credentials, error) => ({
        payload: { credentials, error },
      }),
      reducer: (draft, action) => {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.error = action.payload.error
          draft.data = null
          draft.status = "rejected"
          return
        }
      },
    },

    logout: () => initialState,
  },
})

export const { logout } = actions
export default reducer
