import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import Orphanage from "./Orphanage";

@Entity('images')
export default class Image{
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    path: string;

    @Column()
    orphanage_id: number;

    // @ManyToOne(() => Orphanage, orphanage => orphanage.images, {
    //     cascade: ['insert', 'update']
    // })
    // @JoinColumn({name: 'orphanage_id'})
    // orphanage: Orphanage;
}