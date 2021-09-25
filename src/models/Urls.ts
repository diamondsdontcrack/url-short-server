
import { Mode } from "fs"
import { DataTypes, Model, ModelAttributes, Sequelize} from "sequelize"

export interface UrlsModelAttributes {
  id: string
  originalUrl: string
  isCustom: boolean
  visitCount: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export type CreateUrlsModelAttributes = Pick<UrlsModelAttributes, "id" | "originalUrl" | "isCustom">

export default class Urls extends Model<UrlsModelAttributes, CreateUrlsModelAttributes> 
implements UrlsModelAttributes {
  public id!: string
  public originalUrl!: string
  public isCustom!: boolean
  public visitCount!: number
  public createdAt!: Date
  public updatedAt!: Date
  public deletedAt!: Date | null

  public static getAttributes(): ModelAttributes<Urls, UrlsModelAttributes> {
    return {
      id: {
        primaryKey: true,
        type: DataTypes.STRING(128),
      },
      originalUrl: {
        allowNull: false,
        type: DataTypes.STRING(2_408),
        field: "original_url"
      },
      isCustom: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: "is_custom"
      },
      visitCount: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {min: 0},
        field: "visit_count"
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("DATETIME"),
        field: "created_at"
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("DATETIME"),
        field: "updated_at"
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: "deleted_at"
      },
    }
  }
}