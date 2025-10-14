import { ResourceMedia } from './gallery';
import { Media } from './media';

export interface Award {
    id: number;
    title: string;
    year: number;
    media_id?: number | null;
    description?: string | null;
    created_at: string;
    updated_at: string;

    featured_image?: Media | null;
    gallery: ResourceMedia[];
}
