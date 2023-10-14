import React, { useState, useEffect } from 'react';
import UserCard from '../../components/UserCard';
import Title from '../../components/Title';
import { MinimalEmployee } from 'types';
import { getEmployees } from 'store/employees/api';

export function UserList() {
  const [users, setUsers] = useState<MinimalEmployee[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const result = await getEmployees();
      setUsers(result);
    }
    fetchUsers();
  }, []);

  return (
    <>
      <Title text="My Coworkers" />
      <div>
        {users?.map(user => (
          <UserCard
            key={user.id}
            id={user.id}
            fullname={user.fullname}
            photo={user.photo}
          />
        ))}
      </div>
    </>
  );
}
