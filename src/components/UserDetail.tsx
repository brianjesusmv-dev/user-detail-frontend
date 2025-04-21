import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegMessage } from "react-icons/fa6";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const BASE_URL = import.meta.env.VITE_API_BASE_URL;
          const userResponse = await fetch(`${BASE_URL}/users/${id}`);
          if (!userResponse.ok) {
            setUser(null);
            return;
          }
          const userData = await userResponse.json();
          setUser(userData);
          const postsResponse = await fetch(`${BASE_URL}/users/${id}/posts`);
          const postsData = await postsResponse.json();
          setPosts(postsData);
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  if (loading) {
    return <div style={{ padding: "1rem" }}>Cargando...</div>;
  }

  if (!user) {
    return <div style={{ padding: "1rem" }}>Usuario no encontrado.</div>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ marginTop: 0 }}>{user.name}</h1>
      <table
        style={{
          width: "100%",
          marginBottom: "2rem",
          borderCollapse: "collapse",
        }}
      >
        <tbody>
          <tr>
            <td>
              <strong>Nombre de Usuario:</strong>
            </td>
            <td>{user.username}</td>
          </tr>
          <tr>
            <td>
              <strong>Email:</strong>
            </td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>
              <strong>Teléfono:</strong>
            </td>
            <td>{user.phone}</td>
          </tr>
          <tr>
            <td>
              <strong>Sitio Web:</strong>
            </td>
            <td>{user.website}</td>
          </tr>
          <tr>
            <td>
              <strong>Dirección:</strong>
            </td>
            <td>
              {user.address.suite}, {user.address.street}, {user.address.city},
              {user.address.zipcode}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Geo (Lat/Lng):</strong>
            </td>
            <td>
              {user.address.geo.lat}, {user.address.geo.lng}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Nombre de la Empresa:</strong>
            </td>
            <td>{user.company.name}</td>
          </tr>
          <tr>
            <td>
              <strong>Eslogan:</strong>
            </td>
            <td>{user.company.catchPhrase}</td>
          </tr>
          <tr>
            <td>
              <strong>Sector:</strong>
            </td>
            <td>{user.company.bs}</td>
          </tr>
        </tbody>
      </table>

      <h2>Posts:</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            style={{
              display: "flex",
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              marginBottom: "1rem",
              maxWidth: 700,
            }}
          >
            <div
              style={{
                width: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                paddingRight: "1rem",
              }}
            >
              <FaRegMessage size={24} color="#007bff" />
            </div>

            <div style={{ flex: 1 }}>
              <h4
                style={{
                  marginTop: 0,
                  marginBottom: "0.5rem",
                  color: "#007bff",
                }}
              >
                {post.title}
              </h4>
              <p style={{ margin: 0, color: "#000" }}>{post.body}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No hay posts disponibles.</p>
      )}
    </div>
  );
};

export default UserDetail;
