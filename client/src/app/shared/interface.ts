export interface Workspace {
    name: string,
    displayName: string,
    ownerId?: string,
    id?: string,
    user_email?: string,
    users: string[],
    createdAt?: Date,
    updatedAt?: Date
}

export interface User {
    fullName: string,
    email: string,
    password?: string,
    image?: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
}

export interface Message {
    text: string,
    user_name: string,
    workspace_id?: string,
    user_id?: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
}