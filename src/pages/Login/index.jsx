import "./index.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchLogin } from "../../features/login"
import { useNavigate } from "react-router-dom"
import { selectLogin } from "../../utils/selectors"

function Login() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const loginResult = useSelector(selectLogin)
  const navigate = useNavigate()

  useEffect(() => {
    if (loginResult.status === "resolved") {
      navigate("/profile")
    }
  }, [loginResult])

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault()
              dispatch(fetchLogin({ email: email, password: password }))
            }}
            className="sign-in-button"
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  )
}
export default Login
