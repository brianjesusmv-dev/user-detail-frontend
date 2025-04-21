import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCaretUp, FaCaretDown, FaSearch } from "react-icons/fa";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [originalUsers, setOriginalUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();

  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    fetch(`${BASE_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setOriginalUsers(data);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleSort = (key: string) => {
    let newSortDirection: "asc" | "desc" = "asc";

    if (key === sortColumn) {
      newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    }

    setSortColumn(key);
    setSortDirection(newSortDirection);

    const sortedUsers = [...users].sort((a, b) => {
      let valueA: string | number | undefined;
      let valueB: string | number | undefined;

      if (key.includes(".")) {
        const keys = key.split(".");
        valueA = keys.reduce((obj: any, k: string) => obj?.[k], a);
        valueB = keys.reduce((obj: any, k: string) => obj?.[k], b);
      } else {
        valueA = a[key as keyof User] as string | number | undefined;
        valueB = b[key as keyof User] as string | number | undefined;
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
        return newSortDirection === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else if (typeof valueA === "number" && typeof valueB === "number") {
        return newSortDirection === "asc" ? valueA - valueB : valueB - valueA;
      }

      return 0;
    });

    setUsers(sortedUsers);
  };

  const handleRightClick = (e: React.MouseEvent, _key: string) => {
    e.preventDefault();
    setFilter("");
    setUsers(originalUsers);
    setSortColumn(null);
    setSortDirection("asc");
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.username.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase()) ||
      user.company.name.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ marginTop: 0 }}>Lista de Usuarios</h1>
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Filtrar por nombre, usuario, email o empresa"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th
              onClick={() => handleSort("name")}
              onContextMenu={(e) => handleRightClick(e, "name")}
            >
              Nombre
              {sortColumn === "name" && (
                <span>
                  {sortDirection === "asc" ? <FaCaretUp /> : <FaCaretDown />}
                </span>
              )}
            </th>
            <th
              onClick={() => handleSort("username")}
              onContextMenu={(e) => handleRightClick(e, "username")}
            >
              Nombre de Usuario
              {sortColumn === "username" && (
                <span>
                  {sortDirection === "asc" ? <FaCaretUp /> : <FaCaretDown />}
                </span>
              )}
            </th>
            <th
              onClick={() => handleSort("phone")}
              onContextMenu={(e) => handleRightClick(e, "phone")}
            >
              Teléfono
              {sortColumn === "phone" && (
                <span>
                  {sortDirection === "asc" ? <FaCaretUp /> : <FaCaretDown />}
                </span>
              )}
            </th>
            <th
              onClick={() => handleSort("email")}
              onContextMenu={(e) => handleRightClick(e, "email")}
            >
              Email
              {sortColumn === "email" && (
                <span>
                  {sortDirection === "asc" ? <FaCaretUp /> : <FaCaretDown />}
                </span>
              )}
            </th>
            <th
              onClick={() => handleSort("address.city")}
              onContextMenu={(e) => handleRightClick(e, "address.city")}
            >
              Ciudad
              {sortColumn === "address.city" && (
                <span>
                  {sortDirection === "asc" ? <FaCaretUp /> : <FaCaretDown />}
                </span>
              )}
            </th>
            <th
              onClick={() => handleSort("company.name")}
              onContextMenu={(e) => handleRightClick(e, "company.name")}
            >
              Nombre de la Empresa
              {sortColumn === "company.name" && (
                <span>
                  {sortDirection === "asc" ? <FaCaretUp /> : <FaCaretDown />}
                </span>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} onClick={() => navigate(`/user/${user.id}`)}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
              <td>{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
