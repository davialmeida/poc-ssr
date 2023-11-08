import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { UsersService } from '../../services/users/users'
export const Users: React.FC = () => {
    const { data } = useQuery({ queryKey: ['users'], queryFn: UsersService.get})

    return (
        <pre>{JSON.stringify(data, null, 2)}</pre>
    )
}