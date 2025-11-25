import { Link, useLocation } from "react-router-dom";

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
      <div className="container">
        <Link to="/list" className="navbar-brand d-flex align-items-center">
          <img
            src="/avito_logo.png"
            alt="Avito"
            className="me-2"
            style={{ height: "32px" }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <span className="fw-bold">Модерация</span>
        </Link>
        <div className="navbar-nav ms-auto">
          <Link
            to="/list"
            className={`nav-link ${isActive("/list") ? "active fw-bold" : ""}`}
          >
            Список объявлений
          </Link>
          <Link
            to="/stats"
            className={`nav-link ${isActive("/stats") ? "active fw-bold" : ""}`}
          >
            Статистика
          </Link>
        </div>
      </div>
    </nav>
  );
}
