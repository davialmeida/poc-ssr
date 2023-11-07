import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
export const Users: React.FC = () => {
    const { data } = useQuery({ queryKey: ['Teste'], queryFn: () => {
        return axios.get('https://api.github.com/users').then(res => res.data)
    }})

    return (
        <pre>${JSON.stringify(data, null, 2)}</pre>
    )
}