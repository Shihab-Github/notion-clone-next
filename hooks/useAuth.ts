import { getUserDetails } from "@/data-layer/users";
import { useEffect, useState } from "react";


export default function useAuth() {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const authenticate = async () => {   
            try {                
                const data = await getUserDetails()
                setIsAuthenticated(true)
                setIsLoading(false)
            } catch (error) {
                setIsAuthenticated(false)
                setIsLoading(false)
            }
        }
        
        authenticate()
    }, [])

    return {
        isAuthenticated,
        isLoading
    }
}