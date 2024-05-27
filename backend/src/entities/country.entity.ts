import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Region } from "./region.entity";

@Entity()
export class Country {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    iso2: string;

    @OneToMany(() => Region, region => region.country)
    regions: Region[];
}
