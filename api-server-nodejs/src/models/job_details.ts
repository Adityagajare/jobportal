import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import Skill from "./skills";
import Location from "./location";
import Category from "./category";

@Entity("job_details")
export default class Job_details {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: false })
  title!: string;

  @Column({ type: "text", nullable: false })
  description!: string;

  @ManyToOne(() => Location, location => location.jobDetails)
  location!: Location;

  @Column({ type: "int", nullable: false })
  locationId!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  salary!: number;

  @ManyToMany(() => Skill)
  @JoinTable({
    name: "job_details_skills",
    joinColumn: { name: "jobDetailsId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "skillId", referencedColumnName: "id" },
  })
  skills!: Skill[];

  @ManyToOne(() => Category, category => category.jobDetails)
  category!: Category;

  @Column({ type: "int", nullable: false })
  categoryId!: number;

  @Column({ type: "date", nullable: false })
  dateOfPost!: Date;

  @Column({ type: "date", nullable: false })
  lastDate!: Date;

  @Column({ type: 'text', nullable: false })
  education!: string;

  @Column({ type : "text", nullable: false})
  jobType!: string;

  @Column({ type: "text", nullable: false})
  experience!: string;
  
}

