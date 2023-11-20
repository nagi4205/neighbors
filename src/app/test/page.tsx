"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get('http://localhost/api/users', {
					withCredentials: true
				});
				setUsers(response.data);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};

		fetchUsers();
	}, []);

	return (
		<div>
			<h1>User List</h1>
			<ul>
				{users.map(user => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
		</div>
	);
}
