import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://pixabay.com/api/',
    params: {
        per_page: 15,
        key: '28720799-a754ce579910a3feda1cd147c',
        image_type: 'photo',
        orientation: 'horizontal',
    }
});

export const getPhoto = async(page = 1, q) => {
    const {data} = await instance.get("/", {
        params: {
            page,
            q,
        }
    });
    return data;
}