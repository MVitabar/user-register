import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.png";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersApi = await api.get("/users");

    setUsers(usersApi.data);
  }

  async function createUsers() {
    await api.post("/users", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });

    getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`);

    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>USER REGISTER</h1>
        <input name="name" type="text" placeholder="Name" ref={inputName} />
        <input name="age" type="number" placeholder="Age" ref={inputAge} />
        <input name="email" type="text" placeholder="E-mail" ref={inputEmail} />
        <button type="button" onClick={createUsers}>
          REGISTER
        </button>
      </form>
      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Name: <span>{user.name}</span>
            </p>
            <p>
              Age: <span>{user.age}</span>
            </p>
            <p>
              E-mail: <span>{user.email}</span>
            </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
