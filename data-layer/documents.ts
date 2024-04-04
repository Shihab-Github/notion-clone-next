import axios from 'axios'
import { ARCHIVE_DOCUMENT_API, CREATE_DOCUMENT_API } from './API'
import { CreateDocument, PatchDocument } from '@/interface/Document'


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

export const archiveDocument = (data: PatchDocument) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('access_token')}` 
            }
        };
        const url = ARCHIVE_DOCUMENT_API + '/' + data._id;
        console.log('archive: ', data)
        axios.patch(url, data, config).then((response) => resolve(response.data)).catch((err) => reject(err))
    })
}