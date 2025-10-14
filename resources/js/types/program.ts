import { Category } from './category';
import { ResourceMedia } from './gallery';
import { Media } from './media';
export interface Program {
    id: number;
    name: string;
    slug: string;
    category_id: number;
    category?: Category;
    description?: string; // HTML content
    excerpt?: string;
    objectives?: string;
    age_min?: number;
    age_max?: number;

    // Monthly fees by level
    monthly_fee?: Record<string, number>;

    // Extra fees
    admission_form_fee?: string; // e.g., "500"
    admission_fee?: string; // e.g., "8000"
    yearly_charge?: string; // e.g., "3000"
    uniform_fee?: string; // e.g., "1400"
    books_stationary_fee?: string; // e.g., "According to class"
    khata_fee?: string; // e.g., "50"

    media_id?: number | null;
    featured_image?: Media;
    gallery?: ResourceMedia[]; // Array of image URLs

    is_active: boolean;
    featured: boolean;

    created_at: string; // ISO date string
    updated_at: string; // ISO date string
}
