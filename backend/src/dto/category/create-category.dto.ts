import { Category } from "../../entities/category.entity";
import { Image } from "../../entities/image.entity";
import { Product } from "../../entities/product.entity";

export class CreateCategoryDto {
    name: string;
    description: string;
    isActive: boolean;
    image: Partial<Image>;
    parent: Partial<Category>;
    children: Partial<Category>[];
    products: Partial<Product>[];
}
