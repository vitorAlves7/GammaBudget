export interface User {
    email: string;
    id: string;
    first_name?: string;
    last_name?: string;
    groups?: [];
}

export function buildEmpty() {
    return {
        email: '',
        id: '',
        first_name: '',
        last_name: '',
        groups: [],
    } as User;
}