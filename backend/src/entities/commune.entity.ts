import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { City } from "./city.entity";

@Entity()
export class Commune {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => City, city => city.communes)
    city: City;
}
