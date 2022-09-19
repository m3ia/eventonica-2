import React, {useState} from "react";

const marlin = {name: "Marlin", email: "marlin@gmail.com", id: "1"};
const nemo = {name: "Nemo", email: "nemo@gmail.com", id: "2"};
const dory = {name: "Dory", email: "dory@gmail.com", id: "3"};

const Users = () => {
  const [users, setUsers] = useState([marlin, nemo, dory]);
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

  return (
    <section className="user-management">
      <h2>User Management</h2>

      <ul id="users-list">
        {users.map((user, ind) => {
          return (
            <li key={ind}>
              Name: {user.name}, Email: {user.email}
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
                type="text"
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
        <form id="delete-user" action="#">
          <fieldset>
            <label>User ID</label>
            <input type="text" id="delete-user-id" />
          </fieldset>
          <input type="submit" />
        </form>
      </div>
    </section>
  );
};

export default Users;
