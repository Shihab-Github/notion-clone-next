import {  useMemo} from 'react'
import { jwtDecode } from 'jwt-decode'
import { UserInfo } from '@/interface/UserInfo'

export default function useUser() {
    const userInfo = useMemo(() => {
        const token:string = localStorage.getItem('access_token') || ''
        const decoded: UserInfo = jwtDecode(token)
        return decoded;
    }, [])

    return {
        userInfo
    }
}