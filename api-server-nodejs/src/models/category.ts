import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import JobDetails from "./job_details";

@Entity("category")
export default class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  categoryname!: string;

  @OneToMany(() => JobDetails, jobDetails => jobDetails.categoryId)
  jobDetails!: JobDetails[];
}
