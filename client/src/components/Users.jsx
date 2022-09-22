import React, {useState, useEffect} from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editArr, setEditArr] = useState([]);

  // Add new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {name: name, email: email};
    const rawResponse = await fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const content = await rawResponse.json();

    setUsers([...users, content]);
    setName("");
    setEmail("");
  };

  // Delete a user
  const deleteUser = async (id) => {
    const rawResponse = await fetch(`http://localhost:8080/users/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(users),
    });
    const content = await rawResponse.json();
    setUsers(content);
  };

  // Edit users
  const editUser = (userId) => {
    setEditArr((arr) => [...arr, userId]);
  };

  // Fetch users from the first render
  const getUsers = () => {
    fetch("http://localhost:8080/users")
      .then((res) => res.json())
      .then((res) => setUsers(res));
  };
  useEffect(() => getUsers(), []);

  return (
    <section className="user-management">
      <h2>User Management</h2>

      <ul id="users-list">
        {users.map((user, ind) => {
          return (
            <li key={ind}>
              {editArr.includes(user.id) ? (
                <form id="edit-user" action="#">
                  <label>Name</label>
                  <input
                    type="text"
                    id="edit-user-name"
                    value={name}
                    placeholder={user.name}
                    onChange={(e) => console.log(e.target.value)}
                  />
                  <br />
                  <label>Email</label>
                  <input
                    type="text"
                    id="edit-user-email"
                    value={email}
                    placeholder={user.email}
                    onChange={(e) => console.log(e.target.value)}
                  />
                  <br />
                  <input type="submit" value="Update" />
                </form>
              ) : (
                <>
                  <strong>ID:</strong> {user.id}
                  <br />
                  <strong>Name:</strong> {user.name}
                  <br />
                  <strong>Email:</strong> {user.email}
                  <br />
                  <button>
                    <span
                      className="material-icons edit-btn"
                      onClick={() => editUser(user.id)}>
                      edit
                    </span>
                  </button>
                  <button>
                    <span
                      className="material-symbols-outlined delete-btn"
                      onClick={() => deleteUser(user.id)}>
                      delete
                    </span>
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>

      <div>
        <h3>Add User</h3>
        <form id="add-user" action="#" onSubmit={handleSubmit}>
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
          </fieldset>
          <input type="submit" value="Add" />
        </form>
      </div>
    </section>
  );
};

export default Users;
