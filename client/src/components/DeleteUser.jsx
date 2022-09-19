const DeleteUser = ({users, setUsers}) => {
  const deleteUser = (deleteId) => {
    const newUsers = users.filter((i) => i.id !== deleteId);
    setUsers(newUsers);
  };
  return (
    <form id="delete-user" action="#">
      <fieldset>
        <label>User ID</label>
        <input type="text" id="delete-user-id" />
      </fieldset>
      <input type="submit" onClick={deleteUser} />
    </form>
  );
};

export default DeleteUser;
