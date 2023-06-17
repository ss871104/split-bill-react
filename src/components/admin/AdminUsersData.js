const AdminUsersData = (props) =>{
    const { userId, username, name } = props;

    return (
      <tr>
        <td>{userId}</td>
        <td>{username}</td>
        <td>{name}</td>
      </tr>
    );
}
export default AdminUsersData;