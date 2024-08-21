import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("skills")
export default class Skills {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  skill!: string;
}

