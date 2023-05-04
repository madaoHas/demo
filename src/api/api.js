import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    // headers: {
    //     // "API-KEY": "42ff82da-8b5a-46e0-b5f4-bc9ebe4aa16e"
    // },
    baseURL: "http://127.0.0.1:3333/"
})

instance.interceptors.request.use(function (config) {
    if (localStorage.getItem('token')) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 401) {
        if (localStorage.getItem('token')) {
            localStorage.clear();
        }
    }
    return Promise.reject(error);
});

export const NewsAPI = {
    getNews(currentPage = 1, pageSize = 10) {
        return instance.get(`news?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    getSelectedNews(idNews) {
        return instance.get(`news?id=${idNews}`)
            .then(response => response.data)
    }
}

export const CommentsAPI = {
    getComments() {
        return instance.get(`comments`)
            .then(response => response.data)
    },
}

export const CategoryAPI = {
    getCategory() {
        return instance.post(`user/categories-list`,{})
            .then(response => response)
    },
    addCategory(name) {
        return instance.post(`admin/categories-item-add`, {name})
            .then(response => response.data)
    },
    deleteCategory(idCategory) {
        return instance.delete(`category`, {idCategory})
            .then(response => response.data)
    }
}

export const UsersAdminAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`admin/users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    // getSelectedNews(idNews) {
    //     return instance.get(`news?id=${idNews}`)
    //         .then(response => response.data)
    // }
}

export const NewsAdminAPI = {
    getNews(page = 1, limit = 10) {
        let pager_in = {page: page, limit: limit}
        return instance.post(`admin/news-list`, {pager_in})
            .then(response => response.data)
    },
    addNews(category_id, title, preview_text, preview_image_url, text, text_image_url, date) {
        return instance.post(`admin/news-item-add`, {category_id, title, preview_text, preview_image_url, text, text_image_url, date}, {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        })
            .then(response => response.data)
    }
    // getSelectedNews(idNews) {
    //     return instance.get(`news?id=${idNews}`)
    //         .then(response => response.data)
    // }
}

export const CommentsAdminAPI = {
    getComments(currentPage = 1, pageSize = 10) {
        return instance.get(`admin/comments?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    // getSelectedNews(idNews) {
    //     return instance.get(`news?id=${idNews}`)
    //         .then(response => response.data)
    // }
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
    auth(token) {
        return instance.post(`user/profile-info`, {token} , {
        })
            .then(response => response.data)
    },
    login(email, password) {
        return instance.post(`login`, {email, password})
            .then(response => response.data)
    },
    registration(email, password) {
        return instance.post(`registration`, {email, password})
            .then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`)
            .then(response => response.data)
    }
}


