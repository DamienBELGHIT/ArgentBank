import { selectLogin } from "../utils/selectors"
import { createSlice } from "@reduxjs/toolkit"

import * as profileActions from "./profile"

const initialState = {
  status: "void",
  token: null,
  error: null,
}

export function fetchLogin(credentials) {
  //thunk
  return async (dispatch, getState) => {
    const login = selectLogin(getState())
    dispatch(actions.fetching())
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      })
      if (!response.ok) {
        throw new Error(`status code ${response.status}`)
      }
      const data = await response.json()
      dispatch(actions.resolved(data.body.token))
    } catch (error) {
      dispatch(actions.rejected(error.toString()))
    }
  }
}

const { actions, reducer } = createSlice({
  name: "login",
  initialState,
  reducers: {
    fetching: {
      reducer: (draft) => {
        draft.status = draft.status === "void" ? "pending" : "updating"
      },
    },

    resolved: {
      prepare: (token) => ({
        payload: { token },
      }),
      reducer: (draft, action) => {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.token = action.payload.token
          draft.status = "resolved"
          return
        }
        return
      },
    },

    rejected: {
      prepare: (error) => ({
        payload: { error },
      }),
      reducer: (draft, action) => {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.error = action.payload.error
          draft.token = null
          draft.status = "rejected"
          return
        }
      },
    },

    resetLogin: () => {
      return initialState
    },
  },
})

export const { resetLogin } = actions
export default reducer
