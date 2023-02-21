import { Outlet } from "react-router-dom"
import logo from "../../assets/argentBankLogo.png"
import imgBankTree from "../../assets/bank-tree.jpeg"
import "./index.css"
import { useLocation } from "react-router-dom"

export default function Layout() {
  const location = useLocation()
  return (
    <div>
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img
            className="main-nav-logo-image"
            src={location.pathname === "/" ? logo : imgBankTree}
            alt={location.pathname === "/" ? "Argent Bank Logo" : imgBankTree}
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <a className="main-nav-item" href="/sign-in">
            <i className="fa fa-user-circle"></i>
            {location.pathname === "/" ? "Sign In" : "Tony"}
          </a>

          {location.pathname !== "/" && (
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
