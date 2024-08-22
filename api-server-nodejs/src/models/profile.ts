import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  profileId?: number;

  @Column({ type: "varchar", length: 36 })
  userId?: string;

  @Column({ length: 100 })
  name?: string;

  @Column({ length: 100, unique: true })
  email?: string;

  @Column({ length: 15 })
  phone?: string;

  @Column({ type: "enum", enum: ["Male", "Female", "Other"] })
  gender?: "Male" | "Female" | "Other";

  @Column({ length: 100, nullable: true })
  city?: string;

  @Column({ length: 100, nullable: true })
  country?: string;

  @Column({ length: 100, nullable: true })
  education?: string;

  @Column("text", { nullable: true })
  skills?: string;

  @Column("text", { nullable: true })
  description?: string;

  @Column("text", { nullable: true })
  college?: string;

  @Column("text", {nullable: true})
  yop?: string;

  @Column("text", {nullable:true})
  percentage?: string;

  // @Column({ nullable: true })
  // resumePath?: string; // New column for storing resume path
}
