import React, {useState, useEffect} from "react";
import DeleteUser from "./DeleteUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {id: id, name: name, email: email};
    setUsers([...users, newUser]);
    setName("");
    setEmail("");
    setId("");
  };

  const getUsers = () => {
    fetch("http://localhost:8080/users")
      .then((res) => res.json())
      .then((res) => setUsers(res.users));
  };
  useEffect(() => getUsers(), []);

  return (
    <section className="user-management">
      <h2>User Management</h2>

      <ul id="users-list">
        {users.map((user, ind) => {
          return (
            <li key={ind}>
              <strong>ID:</strong> {user.id}
              <br />
              <strong>Name:</strong> {user.name}
              <br />
              <strong>Email:</strong> {user.email}
            </li>
          );
        })}
      </ul>

      <div>
        <h3>Add User</h3>
        <form id="add-user" action="#">
          <fieldset>
            <p>
              <label>Name</label>
              <br />
              <input
                type="text"
                id="add-user-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </p>
            <p>
              <label>Email</label>
              <br />
              <input
                type="text"
                id="add-user-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </p>
            <p>
              <label>Id</label>
              <br />
              <input
                type="number"
                id="add-user-id"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </p>
          </fieldset>
          <input type="submit" value="Add" onClick={handleSubmit} />
        </form>
      </div>

      <div>
        <h3>Delete User</h3>
        <DeleteUser users={users} setUsers={setUsers} />
      </div>
    </section>
  );
};

export default Users;
