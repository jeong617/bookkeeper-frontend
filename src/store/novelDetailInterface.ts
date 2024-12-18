export interface NovelDetailData {
    id: string;
    title: string;
    authorList: string[];
    category: string[];
    coverImageUrl: string;
    summary: string;
    views: number;
    likes: number;
}

export interface SearchNovelData {
    id: string;
    title: string;
    authorList: string[];
    categoryList: string[];
    coverImageUrl: string;
}

export interface EpisodeData {
    id: string;
    chapter: number;
    title: string;
}

export interface CommentData {
    id: string;
    episodeNumber: number;
    title: string;
    userId: string;
    userName: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}