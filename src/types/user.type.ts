import { Document, Types } from "mongoose";

export interface usertype extends Document {
    profile_info: {
        fullname: string;
        username: string;
        email: string;
        password: string;
        profile_img: {
            publicId: string;
            url: string;
        };
        cover_img: {
            publicId: string;
            url: string;
        };
        bio: string;
    }
    account_info: {
        total_posts: number;
        total_reads: number;
        total_likes: number
    };
    social_links: {
        instagram: string;
        youtube: string;
        facebook: string;
        twitter: string;
        github: string;
        website: string;
    };
    bookmarks: Types.ObjectId[];
    is_verified: boolean;
    verification_code: number;
    verification_code_expiry: Date;
    posts: Types.ObjectId[]
}