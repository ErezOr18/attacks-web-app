import { BaseEntity, Column, Entity, Index, PrimaryColumn } from "typeorm";
@Entity()
export class Attack extends BaseEntity {
  @PrimaryColumn()
  id: string;
  @Column("text", { default: "NA" })
  name!: string;
  @Column("text", { default: "NA" })
  description!: string;
  @Column("text", { default: ["NA"] as string[], array: true })
  phaseName!: string[];
  @Column("text", { default: ["NA"] as string[], array: true })
  xMitrePlatforms!: string[];
  @Column("text", { default: ["NA"] as string[], array: true })
  xMitreDetection!: string[];
}
