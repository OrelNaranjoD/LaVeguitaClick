import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Region } from "./region.entity";
import { Commune } from "./commune.entity";

@Entity()
export class City {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Region, region => region.cities)
    region: Region;

    @OneToMany(() => Commune, commune => commune.city)
    communes: Commune[];
}
