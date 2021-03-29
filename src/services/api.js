import axios from 'axios'

//https://api.hgbrasil.com/weather?key=da680824&lat=-23.682&lon=-46.875

export const key = 'da680824'

const api = axios.create({
    baseURL: 'https://api.hgbrasil.com'
})
export default api