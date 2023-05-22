export interface ListButton<T> {
    content: string;
    onClick: (item: T) => void;
}