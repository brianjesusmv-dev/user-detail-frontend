import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { FaCaretLeft } from "react-icons/fa";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";

const App: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && (
        <nav style={{ padding: "1rem" }}>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.1rem",
            }}
          >
            <FaCaretLeft />
            Lista de Usuarios
          </Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </div>
  );
};

export default App;
