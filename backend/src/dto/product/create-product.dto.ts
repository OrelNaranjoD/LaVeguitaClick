import { Category } from "../../entities/category.entity";
import { Image } from "../../entities/image.entity";

export class CreateProductDto {
    name: string;
    description: string;
    sku: string;
    barcode: string;
    isActive: boolean;
    price: number;
    cost: number;
    categories: Partial<Category>[];
    images: Partial<Image>[];
}
