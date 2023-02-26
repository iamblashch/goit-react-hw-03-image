import axios from "axios";

export const fetchImg = async(qvery, page) => {
    const BASEURL = 'https://pixabay.com/api/';
    const KEY = '32954054-8c97559c3455e9bff63f41603'
    const OPTIONS = `?q=${qvery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    const response = await axios.get(`${BASEURL}${OPTIONS}`)
    return response.data
}