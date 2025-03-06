import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
<link href="./output.css" rel="stylesheet"></link>;

function Help() {
  const navigate = useNavigate();

  const handleCreate = () => navigate("/help/create");
  const handleRead = () => navigate("/help/read");
  const handleUpdate = () => {
    const id = prompt("Masukkan ID user yang ingin diupdate:");
    id ? navigate(`/help/update/${id}`) : null;
  };
  const handleDelete = () => {
    const id = prompt("Masukkan ID user yang ingin dihapus:");
    if (id) {
      axios
        .delete(`https://api.escuelajs.co/api/v1/users/${id}`)
        .then((response) => {
          alert("User deleted successfully!");
          navigate("/help");
        })
        .catch((error) => {
          console.log(error);
          alert("Failed to delete user.");
        });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-500 to-indigo-500 py-10">
      <button
        onClick={() => navigate("/login")}
        className="mb-6 p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-all transform hover:scale-105"
      >
        Back
      </button>
      <h1 className="text-4xl font-extrabold text-white mb-8 text-center tracking-wide">
        Help Page
      </h1>
      <div className="space-x-6 flex flex-wrap justify-center">
        <button
          onClick={handleCreate}
          className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all transform hover:scale-105 shadow-md"
        >
          CREATE USER
        </button>
        <button
          onClick={handleRead}
          className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md"
        >
          READ USER
        </button>
        <button
          onClick={handleUpdate}
          className="p-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all transform hover:scale-105 shadow-md"
        >
          UPDATE USER
        </button>
        <button
          onClick={handleDelete}
          className="p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 shadow-md"
        >
          DELETE USER
        </button>
      </div>
    </div>
  );
}

function CreateUser() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateUser = (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      password: password,
      avatar: "https://i.imgur.com/LD004Qs.jpeg",
    };

    axios
      .post("https://api.escuelajs.co/api/v1/users/", newUser)
      .then((response) => {
        setMessage(`${name} created successfully! `);
        alert("User created successfully!");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to create user.");
      });

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow-xl space-y-6">
      <h1 className="text-3xl font-extrabold text-center">Create User</h1>
      <form onSubmit={handleCreateUser} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-semibold">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md"
        >
          Create User
        </button>
      </form>
      {message && <p className="text-green-600 text-center">{message}</p>}
      <button
        onClick={() => navigate(-1)}
        className="w-full mt-4 p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all transform hover:scale-105 shadow-md"
      >
        Back
      </button>
    </div>
  );
}

const UserProfile = ({ user }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md mb-6 hover:shadow-xl transition-all">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-14 h-14 rounded-full mr-6"
      />
      <div>
        <div className="text-xl font-semibold">{user.name}</div>
        <div className="text-sm text-gray-500">{user.email}</div>
      </div>
    </div>
  );
};

const ReadUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to fetch users.");
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-400 to-purple-500 py-12">
      <h1 className="text-4xl font-extrabold text-white text-center mb-10">
        User List
      </h1>
      <button
        onClick={() => navigate(-1)}
        className="p-3 bg-gray-700 text-white rounded-lg mb-6 hover:bg-gray-800 transition-all transform hover:scale-105"
      >
        Back
      </button>
      <div className="max-w-5xl mx-auto space-y-8">
        {users.map((user) => (
          <UserProfile key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

const UpdateUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://api.escuelajs.co/api/v1/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to fetch user.");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://api.escuelajs.co/api/v1/users/${id}`, user)
      .then((response) => {
        alert("User updated successfully!");
        navigate("/help");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to update user.");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow-xl space-y-6">
      <h1 className="text-3xl font-extrabold text-center">Update User</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={user.name || ""}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email || ""}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={user.password || ""}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md"
        >
          Update User
        </button>
      </form>
      <button
        onClick={() => navigate("/help")}
        className="w-full mt-4 p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all transform hover:scale-105 shadow-md"
      >
        Back
      </button>
    </div>
  );
};

export default Help;
export { CreateUser, ReadUser, UpdateUser };
