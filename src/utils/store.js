import loginReducer from "../features/login"
import profileReducer from "../features/profile"
import { configureStore } from "@reduxjs/toolkit"

export default configureStore({
  reducer: {
    login: loginReducer,
    profile: profileReducer,
  },
})
