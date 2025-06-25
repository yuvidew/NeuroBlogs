export interface CardProps {
    onPress?: () => void;
    title: string;
    coverImage: string;
    authorImage: string;
    authorName: string;
    publishedAt: string;
    categories?: string;
}

export interface CategoryCardProps {
    img: string,
    category: string,
    onPress: () => void
    className?: string
}

export interface TabIconProps {
    focused: boolean;
    icon: any;
    title?: string;
    size?: string;
}

export interface GenerateBlogFormType {
    title : string,
    category  :string,
    content : string
}