"use client"

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const result = await signIn('credentials', {
			redirect: false,
			email: email,
			password: password
		});

		if (result?.ok) {
			window.location.href = '/home';
		} else {
			console.error('Failed to log in');
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div>
					<button type="submit">Log In</button>
				</div>
			</form>
		</div>
	);
}
