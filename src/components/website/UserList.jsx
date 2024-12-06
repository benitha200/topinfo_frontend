import React from 'react';

const UserList = ({ users }) => {
  return (
    <div className="bg-white rounded shadow-md p-4">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left font-medium py-2">Name</th>
            <th className="text-left font-medium py-2">Email</th>
            <th className="text-left font-medium py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;