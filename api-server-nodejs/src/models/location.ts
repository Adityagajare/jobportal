import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import JobDetails from "./job_details";

@Entity("location")
export default class Location {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  city!: string;

  @Column({ type: "varchar", length: 255 })
  country!: string;

  @OneToMany(() => JobDetails, jobDetails => jobDetails.locationId)
  jobDetails!: JobDetails[];
}
