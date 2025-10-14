import { ResourceMedia } from './gallery';
import { Media } from './media';

export interface Event {
    id: number;
    title: string;
    slug: string;
    description?: string | null;
    location?: string | null;
    start_date: string;
    end_date?: string | null;
    media_id?: number | null;
    status: 'Active' | 'Inactive';
    created_at: string;
    updated_at: string;

    featured_image?: Media | null;
    gallery: ResourceMedia[];
}
