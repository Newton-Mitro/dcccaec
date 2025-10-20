export interface Visitor {
    id: number;
    session_id: string;
    ip_address?: string | null;
    user_agent?: string | null;
    device?: string | null;
    browser?: string | null;
    os?: string | null;
    last_activity: string; // ISO timestamp (e.g., "2025-10-20T09:30:00Z")
    created_at: string;
    updated_at: string;
}
