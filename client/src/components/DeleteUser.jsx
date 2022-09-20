import {useState} from "react";

const DeleteUser = ({users, setUsers}) => {
  const [userId, setUserId] = useState("");

  const deleteUser = (e) => {
    e.preventDefault();
    if (!userId || userId < 1) {
      alert("Please enter a valid user ID.");
    }
    const newUsers = users.filter((i) => i.id !== userId);
    setUsers(newUsers);
    setUserId("");
  };
  return (
    <form id="delete-user" action="#" onSubmit={deleteUser}>
      <fieldset>
        <label>User ID</label>
        <input
          type="text"
          id="delete-user-id"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </fieldset>
      <input type="submit" />
    </form>
  );
};

export default DeleteUser;
