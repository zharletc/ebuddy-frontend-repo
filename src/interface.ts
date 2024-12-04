export interface Response {
    success: boolean;
    message: string;
    data: any;
}

export interface User {
    id?: string;
    name: string;
    email: string;
    role: string;
    createdAt?: string;
}
