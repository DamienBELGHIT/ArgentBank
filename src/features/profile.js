import { selectProfile } from "../utils/selectors"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  status: "void",
  data: null,
  error: null,
}

export function fetchProfile(token) {
  //thunk
  return async (dispatch, getState) => {
    const profile = selectProfile(getState())
    if (profile.status === "void") {
      dispatch(actions.fetching())
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/user/profile",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        if (!response.ok) {
          throw new Error(`status code ${response.status}`)
        }
        const data = await response.json()
        dispatch(actions.resolved(data))
      } catch (error) {
        dispatch(actions.rejected(error.toString()))
      }
    }
  }
}

const { actions, reducer } = createSlice({
  name: "profile",
  initialState,
  reducers: {
    fetching: {
      reducer: (draft) => {
        draft.status = draft.status === "void" ? "pending" : "updating"
      },
    },

    resolved: {
      prepare: (data) => ({
        payload: { data },
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
      prepare: (error) => ({
        payload: { error },
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
  },
})

export default reducer
