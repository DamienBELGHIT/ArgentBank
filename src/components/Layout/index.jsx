import { Outlet, useNavigate } from "react-router-dom"
import logo from "../../assets/argentBankLogo.png"
import { useDispatch, useSelector } from "react-redux"
import { selectLogin, selectProfile } from "../../utils/selectors"
import { logout } from "../../features/logout"
import "./index.css"

export default function Layout() {
  const dispatch = useDispatch()
  const profileData = useSelector(selectProfile)
  const loginData = useSelector(selectLogin)
  const navigate = useNavigate()

  return (
    <div className="main-container">
      <nav className="main-nav">
        <a className="main-nav-logo" onClick={() => navigate("/")}>
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="ArgentBank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        {loginData.status === "resolved" &&
        profileData.status === "resolved" ? (
          <div>
            <a className="main-nav-item" onClick={() => navigate("/profile")}>
              <i className="fa fa-user-circle"></i>
              {profileData.data.body.firstName}
            </a>
            <a
              className="main-nav-item"
              onClick={() => {
                dispatch(logout())
                navigate("/")
              }}
            >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </a>
          </div>
        ) : (
          <div>
            <a className="main-nav-item" onClick={() => navigate("/login")}>
              <i className="fa fa-user-circle"></i>
              Sign in
            </a>
          </div>
        )}
      </nav>
      <Outlet />
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  )
}
