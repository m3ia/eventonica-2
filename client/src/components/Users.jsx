import React, {useState, useEffect} from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [updatedUser, setUpdatedUser] = useState(null);

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
  const clickEdit = (user) => {
    setUpdatedUser({...user});
  };

  const editUser = async (e, id) => {
    e.preventDefault();

    const rawResponse = await fetch(`http://localhost:8080/users/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
    const content = await rawResponse.json();

    setUsers(content);
    setUpdatedUser(null);
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
      <div className="forms">
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
      <div className="lists">
        <h3>All Users</h3>
        <ul id="users-list">
          {users.map((user, ind) => {
            return (
              <li key={ind} className="cards">
                {updatedUser !== null && updatedUser.id === user.id ? (
                  <form id="edit-user" action="#">
                    <div className="card-info">
                      <label>Name</label>
                      <input
                        type="text"
                        id="edit-user-name"
                        value={updatedUser.name}
                        onChange={(e) =>
                          setUpdatedUser((item) => ({
                            ...item,
                            name: e.target.value,
                          }))
                        }
                      />
                      <br />
                      <label>Email</label>
                      <input
                        type="text"
                        id="edit-user-email"
                        value={updatedUser.email}
                        onChange={(e) =>
                          setUpdatedUser((item) => ({
                            ...item,
                            email: e.target.value,
                          }))
                        }
                      />
                      <br />
                    </div>
                    <div className="buttons">
                      <button onClick={() => setUpdatedUser(null)}>
                        cancel
                      </button>
                      <input
                        type="submit"
                        value="update"
                        onClick={(e) => editUser(e, user.id)}
                      />
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="card-info">
                      <strong>ID:</strong> {user.id}
                      <br />
                      <strong>Name:</strong> {user.name}
                      <br />
                      <strong>Email:</strong> {user.email}
                      <br />
                    </div>
                    <div className="buttons">
                      <button>
                        <span
                          className="material-icons edit-btn"
                          onClick={() => clickEdit(user)}>
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
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Users;
