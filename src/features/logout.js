import { resetLogin } from "./login"
import { resetProfile } from "./profile"

export const logout = () => (dispatch) => {
  dispatch(resetLogin())
  dispatch(resetProfile())
}
