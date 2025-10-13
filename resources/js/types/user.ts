export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string | null;
    username?: string | null;
    avatar?: string | null;
    headline?: string | null;
    bio?: string | null;
    settings?: Record<string, any> | null;
    role: 'VISITOR' | 'EDITOR' | 'ADMIN';
    created_at: string;
    updated_at: string;
}
