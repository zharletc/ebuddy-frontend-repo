import axios from '@/axios-client'; // Import your axios instance here

export const post = async ({ url, params, form = null, withAuth = true, token = '' }: { url: string, form: any, params?: any, withAuth?: boolean, token?: string }) => {
    if (withAuth) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const response = await axios.post(url, form, {
        headers: {
            "Authentication": "$2b$10$WigDg5zlt0rtL/hMLKPh8OTuqjEFZRkP27wc7NjsWdeomGHwc2tD6",
        },
    });

    return response.data;
}

export const put = async ({ url, params, form = null, withAuth = true, token = '' }: { url: string, form: any, params?: any, withAuth?: boolean, token?: string }) => {
    if (withAuth) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const response = await axios.put(url, form, {
        headers: {
            "Authentication": "$2b$10$WigDg5zlt0rtL/hMLKPh8OTuqjEFZRkP27wc7NjsWdeomGHwc2tD6",
        },
    });

    return response.data;
}


export const get = async ({ url, params, withAuth = true, token = '' }: { url: string, params?: any, withAuth?: boolean, token?: string }) => {
    if (withAuth) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const response = await axios.get(url, {
        params: params,
        headers: {
            "Authentication": "$2b$10$WigDg5zlt0rtL/hMLKPh8OTuqjEFZRkP27wc7NjsWdeomGHwc2tD6",
        },
    });

    return response.data;
}