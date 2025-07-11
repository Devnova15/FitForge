export const ROUTES = {
    API: {
        USERS: {
            REGISTER: "/api/users",
            LOGIN: "/api/users/login",
            UPDATE: "/api/users",
            UPDATE_PASSWORD: "/api/users/update-password",
            GET_BY_ID: (id) => `/api/users/${id}`,
            GET_ALL: "/api/users",
            ADD_AWARD: (awardId) => `/api/users/awards/${awardId}`,
            DELETE_AWARD: (awardId) => `/api/users/awards/${awardId}`,
            ADD_FOLLOWER: (userId) => `/api/users/followers/${userId}`,
            DELETE_FOLLOWER: (userId) => `/api/users/followers/${userId}`,
        },
        AWARDS: {
            CREATE: "/api/awards",
            UPDATE: (id) => `/api/awards/${id}`,
            DELETE: (id) => `/api/awards/${id}`,
            GET_ALL: "/api/awards",
            GET_BY_ID: (id) => `/api/awards/${id}`,
        },
        POSTS: {
            CREATE: "/api/posts",
            UPDATE: (id) => `/api/posts/${id}`,
            UPDATE_LIKES: (id) => `/api/posts/${id}`,
            DELETE: (id) => `/api/posts/${id}`,
            GET_ALL: "/api/posts",
            GET_BY_ID: (id) => `/api/posts/${id}`,
        },
        COMMENTS: {
            CREATE: "/api/comments",
            UPDATE: (id) => `/api/comments/${id}`,
            DELETE: (id) => `/api/comments/${id}`,
            GET_ALL: "/api/comments",
            GET_BY_USER: (userId) => `/api/comments/user/${userId}`,
            GET_BY_POST: (postId) => `/api/comments/post/${postId}`,
        },
    },

    CLIENT: {
        HOME: "/",
        AUTH: {
            LOGIN: "/login",
            REGISTER: "/register",
            FORGOT_PASSWORD: "/forgot-password",
        },
        PROFILE: {
            DASHBOARD: "/profile",
            SETTINGS: "/profile/settings",
            FOLLOWERS: "/profile/followers",
            POSTS: "/profile/posts",
            AWARDS: "/profile/awards",
        },
        USERS: {
            LIST: "/users",
            DETAIL: (id) => `/users/${id}`,
        },
        POSTS: {
            LIST: "/posts",
            DETAIL: (id) => `/posts/${id}`,
            CREATE: "/posts/create",
            EDIT: (id) => `/posts/${id}/edit`,
        },
        AWARDS: {
            LIST: "/awards",
            DETAIL: (id) => `/awards/${id}`,
        },
        ADMIN: {
            DASHBOARD: "/admin",
            USERS: "/admin/users",
            POSTS: "/admin/posts",
            AWARDS: "/admin/awards",
            AWARDS_CREATE: "/admin/awards/create",
            AWARDS_EDIT: (id) => `/admin/awards/${id}/edit`,
        },
        ABOUT: "/about",
        CONTACT: "/contact",
    },
};