import axios, {toFormData} from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "42ff82da-8b5a-46e0-b5f4-bc9ebe4aa16e"
    },
    baseURL: "https://social-network.samuraijs.com/api/1.0/"
})

export const NewsAPI = {
    getNews(currentPage = 1, pageSize = 10) {
        return instance.get(`news?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    }
}

export const ProfileAPI = {
    getGeneralInfo() {
        return instance.get(`profile`)
            .then(response => response.data)
    },
    getPassword() {
        return instance.get(`profile`)
            .then(response => response.data)
    }
}

export const AuthAPI = {
    auth() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
    login(email, password) {
        return instance.post(`auth/login`, {email, password})
            .then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`)
            .then(response => response.data)
    }
}


