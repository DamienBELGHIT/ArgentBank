import { Outlet } from "react-router-dom"
import logo from "../../assets/argentBankLogo.png"
import { useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import "./index.css"
import * as loginActions from "../../features/login"
import { selectProfile } from "../../utils/selectors"

export default function Layout() {
  const dispatch = useDispatch()
  const location = useLocation()
  const profileResult = useSelector(selectProfile)

  return (
    <div className="main-container">
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="ArgentBank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <a className="main-nav-item" href="/login">
            <i className="fa fa-user-circle"></i>
            {location.pathname === "/" || location.pathname === "/login"
              ? " Sign In"
              : profileResult.data.body.firstName}
          </a>

          {location.pathname !== "/" && location.pathname !== "/login" && (
            <a className="main-nav-item" href="/">
              <i className="fa fa-sign-out"></i>
              Sign Out
            </a>
          )}
        </div>
      </nav>
      <Outlet />
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  )
}
