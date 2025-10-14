import { ResourceMedia } from './gallery';
import { Media } from './media';

export interface Page {
    id: number;
    title: string;
    subtitle?: string;
    slug: string;
    meta_title?: string | null;
    meta_description?: string | null;
    meta_keywords?: string | null;

    content?: string | null;
    excerpt?: string | null;
    json_array?: any[]; // JSON casted object
    button_text?: string | null;
    button_link?: string | null;

    media_id?: number | null;
    featured_image?: Media | null; // featured media
    gallery: ResourceMedia[];

    predefined: boolean;

    created_at?: string;
    updated_at?: string;
}
