import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/users/usersSlice';

const UsersList = () => {
  const { users, isLoading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <>
      {isLoading && <h4>Loading...</h4>}
      {error && <h4>{error}</h4>}
      {users && (
        <ul className="list-container">
          <div>
            <h2>Users</h2>
            <hr />
          </div>
          <div>
            {users.map((user) => (
              <div key={user.login.uuid} className="card">
                <h5>
                  {user.name.first}
                  {' '}
                  {user.name.last}
                </h5>
              </div>
            ))}
          </div>
        </ul>
      )}
    </>
  );
};

export default UsersList;
