export interface Holiday {
    id: number; // Primary key
    date: string; // ISO date string, e.g., "2025-02-21"
    title: string; // Holiday title
    description?: string; // Optional description
    created_at: string; // Timestamp string
    updated_at: string; // Timestamp string
}
