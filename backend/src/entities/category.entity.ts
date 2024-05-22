import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Product } from './product.entity';
import { Image } from './image.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    modifiedAt: Date;

    @OneToOne(() => Image, image => image.category)
    image: Image;

    @ManyToOne(() => Category, category => category.children)
    parent: Category;

    @ManyToMany(() => Category, category => category.parent)
    children: Category[];

    @ManyToMany(() => Product, product => product.categories)
    products: Product[];
}
