import { useState, useEffect, useContext } from 'react';
import axios from '../helpers/axios';
import { AuthContext } from '../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineLoading } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';

const Dashboard = () => {
  const { user: me } = useContext(AuthContext);
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState(''); // New state for validation errors

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/me');
        if (response.status === 200) {
          if (response.data.role === 'admin' || response.data.role === 'CEO') {
            const usersResponse = await axios.get('/api/users');
            const allUsers = usersResponse.data;
            setAdmins(allUsers.filter(user => user.role === 'admin'));
            setUsers(allUsers.filter(user => user.role === 'user'));
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleEdit = user => {
    setEditingUser(user);
    setUsername(user.username);
    setPassword('');
    setOldPassword('');
    setRole(user.role);
    setValidationError(''); // Clear the validation error when editing starts
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        await axios.delete(`/api/users/${userId}`);
        setAdmins(admins.filter(admin => admin._id !== userId));
        setUsers(users.filter(user => user._id !== userId));
        toast.success('User deleted successfully', { autoClose: 3000 });
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Error deleting user', { autoClose: 3000 });
      }
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validate the username field
    if (!username.trim()) {
      setValidationError('Username cannot be empty.');
      return; // Prevent form submission if validation fails
    }

    setLoading(true);
    setValidationError(''); // Clear validation errors if form submission passes

    try {
      const data = { username };
      if (password && editingUser._id === me._id) {
        data.oldPassword = oldPassword;
        data.password = password;
      }
      if (me.role === 'CEO') {
        data.role = role;
      }

      const updatedUser = await axios.put(`/api/users/${editingUser._id}`, data);

      if (updatedUser.data.role === 'admin') {
        setAdmins(admins.map(user => (user._id === updatedUser.data._id ? updatedUser.data : user)));
      } else {
        setUsers(users.map(user => (user._id === updatedUser.data._id ? updatedUser.data : user)));
      }

      setEditingUser(null);
      setUsername('');
      setPassword('');
      setOldPassword('');
      setRole('');
      setLoading(false);
      toast.success('User updated successfully', { autoClose: 3000 });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error, { autoClose: 3000 });
      } else {
        toast.error('An unexpected error occurred. Please try again.', { autoClose: 3000 });
      }
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4 pb-20">
      <ToastContainer />
      {me && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Welcome, {me.username}!</h1>
            <p className="mt-2 text-lg text-gray-600">Username: {me.username}</p>
            <p className="mt-4 text-lg text-gray-600">Email: {me.email}</p>
            <p className="mt-2 text-lg text-gray-600">Role: {me.role}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Edit Profile</h2>
            <button onClick={() => handleEdit(me)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Edit Your Profile
            </button>
          </div>

          {(me.role === 'admin' || me.role === 'CEO') && (
            <div className="mt-8">
              {me.role === 'CEO' && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800">Admins</h2>
                  <ul className="mt-4 space-y-2">
                    {admins.map(admin => (
                      <li key={admin._id} className="flex justify-between items-center p-4 bg-gray-100 rounded">
                        <span>{admin.username} - {admin.email}</span>
                        <div>
                          <button onClick={() => handleEdit(admin)} className="ml-4 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                          <button onClick={() => handleDelete(admin._id)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
                <ul className="mt-4 space-y-2">
                  {users.map(user => (
                    <li key={user._id} className="flex justify-between items-center p-4 bg-gray-100 rounded">
                      <span>{user.username} - {user.email}</span>
                      <div>
                        <button onClick={() => handleEdit(user)} className="ml-4 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                        {(me.role === 'CEO' || (me.role === 'admin' && user.role !== 'admin')) && (
                          <button onClick={() => handleDelete(user._id)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {editingUser && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-xl font-semibold text-gray-800">Edit</h3>
                <form onSubmit={handleSubmit} className="mt-4">
                  <div>
                    <label className="block text-lg text-gray-600">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      className={`mt-1 p-2 border ${validationError ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
                    />
                    {validationError && (
                      <p className="text-red-500 text-sm mt-1">{validationError}</p> // Display error message if username is empty
                    )}
                  </div>
                  {editingUser._id === me._id && (
                    <>
                      <div className="mt-4">
                        <label className="block text-lg text-gray-600">Old Password </label>
                        <input
                          type="password"
                          value={oldPassword}
                          onChange={e => setOldPassword(e.target.value)}
                          className="mt-1 p-2 border border-gray-300 rounded w-full"
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-lg text-gray-600">New Password( Optional )</label>
                        <input
                          type="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="mt-1 p-2 border border-gray-300 rounded w-full"
                        />
                      </div>
                    </>
                  )}
                  {me.role === 'CEO' && editingUser._id !== me._id && (
                    <div className="mt-4">
                      <label className="block text-lg text-gray-600">Role</label>
                      <select
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  )}
                  <div className="mt-6 flex justify-end">
                    <button type="button" onClick={() => setEditingUser(null)} className="px-4 py-2 bg-gray-500 text-white rounded mr-4 hover:bg-gray-600">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Save</button>
                  </div>
                </form>
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <AiOutlineLoading className="animate-spin text-white text-4xl" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
