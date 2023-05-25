import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    // headers: {
    //     // "API-KEY": "42ff82da-8b5a-46e0-b5f4-bc9ebe4aa16e"
    // },
    baseURL: process.env.REACT_APP_URL_BASE
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
    getNews(category_id, currentPage = 1, pageSize = 8) {
        let pager_in = {page: currentPage, limit: pageSize}
        return instance.post(`user/news-list`, {category_id, pager_in})
            .then(response => response.data)
    },
    getSelectedNews(id) {
        return instance.post(`user/news-item`, {id})
            .then(response => response.data)
    }
}

export const CommentsAPI = {
    getComments(id, page = 1, limit = 10) {
        let pager_in = {page: page, limit: limit};
        return instance.post(`user/comments-list`, {id, pager_in})
            .then(response => response.data)
    },
    addComments(post_id, text) {
        return instance.post(`user/set-comment`, {post_id, text})
            .then(response => response.data)
    },
}

export const CategoryAPI = {
    getCategory() {
        return instance.post(`user/categories-list`,{})
            .then(response => response)
    },
    getCategoryAdmin(page = 1, limit = 10) {
        let pager_in = {page: page, limit: limit}
        return instance.post(`admin/categories-list`,{pager_in})
            .then(response => response)
    },
    addCategory(name) {
        return instance.post(`admin/categories-item-add`, {name})
            .then(response => response.data)
    },
    updateCategory(id, name) {
        return instance.post(`admin/categories-item-update`, {id, name})
            .then(response => response.data)
    },
    deleteCategory(id) {
        return instance.post(`admin/categories-item-delete`, {id})
            .then(response => response.data)
    }
}

export const UsersAdminAPI = {
    getUsers(page = 1, limit = 10) {
        let pager_in = {page: page, limit: limit}
        return instance.post(`admin/users-list`, {pager_in})
            .then(response => response.data)
    },
    getUserItem(id) {
        return instance.post(`admin/users-item`, {id})
            .then(response => response.data)
    },
    updateUserItem(userItem) {
        return instance.post(`admin/users-item-update`, userItem, {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        })
            .then(response => response.data)
    },
    addUsers(email, password) {
        return instance.post(`admin/users-item-add`, {email, password})
            .then(response => response.data)
    },
    deleteUser(id) {
        return instance.post(`admin/users-item-delete`, {id})
            .then(response => response.data)
    },
    updateActiveUser(id, is_active) {
        return instance.post(`admin/users-item-set-active`, {id, is_active})
            .then(response => response.data)
    }
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
    getNewsItem(id) {
        return instance.post(`admin/news-item`, {id})
            .then(response => response.data)
    },
    addNews(category_id, title, preview_text, preview_image_url, text, text_image_url, date) {
        return instance.post(`admin/news-item-add`, {category_id, title, preview_text, preview_image_url, text, text_image_url, date}, {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        })
            .then(response => response.data)
    },
    updateNews(id, category_id, title, preview_text, preview_image_url, text, text_image_url, date, is_active) {
        if (typeof text_image_url === 'string' && typeof preview_image_url === 'string') {
            return instance.post(`admin/news-item-update`, {id, category_id, title, preview_text, text, date, is_active}, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            })
                .then(response => response.data)
        }
        if (typeof preview_image_url === 'string') {
            if (text_image_url === null) {
                text_image_url = 'null'
            }
            return instance.post(`admin/news-item-update`, {id, category_id, title, preview_text, text, text_image_url, date, is_active}, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            })
                .then(response => response.data)
        }
        if (typeof text_image_url === 'string') {
            if (preview_image_url === null) {
                preview_image_url = 'null'
            }
            return instance.post(`admin/news-item-update`, {id, category_id, title, preview_text, preview_image_url, text, date, is_active}, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            })
                .then(response => response.data)
        }
        if (preview_image_url === null) {
            preview_image_url = 'null'
        }
        if (text_image_url === null) {
            text_image_url = 'null'
        }
        return instance.post(`admin/news-item-update`, {id, category_id, title, preview_text, preview_image_url, text, text_image_url, date, is_active}, {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        })
            .then(response => response.data)
    },
    updateActive(id, is_active) {
        return instance.post(`admin/news-item-set-active`, {id, is_active})
            .then(response => response.data)
    },
    deleteNews(id) {
        return instance.post(`admin/news-item-delete`, {id})
            .then(response => response.data)
    }



}

export const CommentsAdminAPI = {
    getComments(page = 1, limit = 10) {
        let pager_in = {page: page, limit: limit}
        return instance.post(`admin/comments-list`, {pager_in})
            .then(response => response.data)
    },
    getCommentItem(id) {
        return instance.post(`admin/comments-item`, {id})
            .then(response => response.data)
    },
    updateComment(id, text) {
        return instance.post(`admin/comments-item-update`, {id, text})
            .then(response => response.data)
    },
    deleteComment(id) {
        return instance.post(`admin/comments-item-delete`, {id})
            .then(response => response.data)
    },
}

export const ProfileAPI = {
    getGeneralInfo() {
        return instance.post(`user/profile`)
            .then(response => response.data)
    },
    setGeneralInfo(name, surname, phone_number, city, birthday, avatar_url, email) {
        let avatar = {avatar_url: avatar_url}
        let profile = {name: name, surname: surname, phone_number: phone_number, city: city, birthday: birthday}
        return instance.post(`user/set-profile`, {email, profile, avatar}, {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        })
            .then(response => response.data)
    },
    setPassword(old_password, password) {
        return instance.post(`user/set-profile-password`, {old_password, password})
            .then(response => response.data)
    }
}

export const AuthAPI = {
    auth() {
        return instance.post(`user/profile-info`)
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
        return instance.post(`logout`)
            .then(response => response.data)
    }
}


