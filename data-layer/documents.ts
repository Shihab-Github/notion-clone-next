import axios from 'axios'
import { CREATE_DOCUMENT_API } from './API'
import { CreateDocument } from '@/interface/Document'


export const createDocument = (data: CreateDocument) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('access_token')}` 
            }
        };

        axios.post(CREATE_DOCUMENT_API, data, config).then((response) => resolve(response.data)).catch((err) => reject(err))
    })
}