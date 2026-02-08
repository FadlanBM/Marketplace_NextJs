'use client'

import { useQuery } from '@tanstack/react-query'
import { getUsers } from '@/actions/user'

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  })
}
