import { Link } from "react-router-dom";
import RoutesIndex from "./routes";

export default function App() {
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
          <div className="container">
            {/* Logo/Home */}
            <Link to="/" className="navbar-brand">
              HOME
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/about" className="nav-link" aria-current="page">
                    TENTANG KAMI
                  </Link>
                </li>

                {/* Menu Schedule */}
                <li className="nav-item">
                  <Link to="/schedule" className="nav-link" aria-current="page">
                    JADWAL
                  </Link>
                </li>

                {/* Menu Lomba */}
                <li className="nav-item">
                  <Link to="/lomba" className="nav-link" aria-current="page">
                    LOMBA
                  </Link>
                </li>

                {/* Menu Pendaftaran */}
                <li className="nav-item">
                  <Link
                    to="/pendaftaran"
                    className="nav-link"
                    aria-current="page"
                  >
                    PENDAFTARAN
                  </Link>
                </li>
              </ul>

              {/* External Link */}
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    href="https://www.instagram.com/gochampid/"
                    target="_blank"
                    className="btn btn-success"
                    rel="noopener noreferrer"
                  >
                    GoChampID.COM
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      {/* Routes */}
      <RoutesIndex />
    </>
  );
}
