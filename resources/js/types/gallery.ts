import { Media } from './media';

export interface ResourceMedia {
    id?: number;
    gallery_id?: number;
    media_id: number | null;
    caption?: string;
    description?: string;
    created_at: string;
    updated_at: string;

    media?: Media | null;
}

export interface Gallery {
    id: number;
    title: string;
    description?: string;
    media_id: number;
    created_at: string;
    updated_at: string;

    featured_image?: Media; // optional relation
    items: ResourceMedia[]; // optional related media entries
}
