// src/pages/userManagementPage.jsx

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner'; // Assuming you have a loading spinner
import { Button } from '../components/ui/Button'; // Assuming you have a Button component

const API_BASE_URL = 'http://localhost:5000/api';

const UserManagementPage = () => {
  const { getAuthHeaders, currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!currentUser || currentUser.role !== 'admin') {
        setError('Access Denied. You must be an administrator.');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_BASE_URL}/admin/users`, {
          method: 'GET',
          headers: getAuthHeaders(),
        });
        const data = await response.json();
        
        if (response.ok) {
          setUsers(data);
        } else {
          setError(data.message || 'Failed to fetch users.');
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError('Server error. Could not load users.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [currentUser, getAuthHeaders]);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      
      if (response.ok) {
        setUsers(users.filter(user => user._id !== userId));
        toast.success(data.message || 'User deleted successfully!');
      } else {
        toast.error(data.message || 'Failed to delete user.');
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error('Server error. Failed to delete user.');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center text-white">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 min-h-screen text-gray-200">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-green-400 mb-8">User Management</h1>
        
        {users.length === 0 ? (
          <p className="text-center text-lg text-gray-400">No users found.</p>
        ) : (
          <div className="overflow-x-auto bg-gray-900 rounded-xl shadow-lg border border-gray-800">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {users.map(user => (
                  <tr key={user._id} className="hover:bg-gray-850 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-600 text-purple-100' : 'bg-gray-600 text-gray-100'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button 
                        variant="ghost" 
                        onClick={() => handleDeleteUser(user._id)}
                        disabled={user.role === 'admin'} // Prevent deleting other admins
                        className="text-red-500 hover:text-red-400"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementPage;