import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { UsersService } from '../../services/users/users'
export const Users: React.FC = () => {
    const { data } = useQuery({ queryKey: ['users'], queryFn: UsersService.get})

    return (
        <table>
            <thead>
                <th>Login</th>
                <th>Url</th>
                <th>Type</th>
            </thead>
            <tbody>
                {data?.map(user => (
                    <tr key={user.id}>
                        <td>{user.login}</td>
                        <td>{user.url}</td>
                        <td>{user.type}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}