export interface DjProductAPI {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    discountPercentage?: number;
}
