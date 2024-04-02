import { useEffect, useState } from 'react'
import axios from 'axios'
import { Document } from '@/interface/Document'
import { GET_DOCUMENTS } from '@/data-layer/API'
import { toast } from 'sonner'


export default function useDocuments(parentDocumentId:string) {
    const [isLoading, setIsLoading] = useState(true)
    const [documents, setDocuments] = useState<Document[]>([])

    useEffect(() => {
        try {

            const getDocuments = async () => {
                let url = GET_DOCUMENTS
                if(parentDocumentId) {
                    url = url + '?parentPageId=' + parentDocumentId;
                }
    
                const config = {
                    headers: { 
                        Authorization: `Bearer ${localStorage.getItem('access_token')}` 
                    }
                };
                const response = await axios.get(url, config)
                setDocuments((prev) => [...prev, ...response.data])
                setIsLoading(false)
            }
            
            getDocuments()
            

        } catch(ex) {
            setIsLoading(false)
            console.log('ex: ', ex)
            toast.error('Failed to get documents')
        }

    }, [parentDocumentId])

    return [isLoading, documents] as const

}