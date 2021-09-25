import { DataTypes, DATE, Sequelize } from "sequelize";

// insert into 
// TODO: Move this to models/Urls
export interface CreateShortUrlData {
  id: string
  originalUrl: string
  isCustom: Boolean
}

export default class DatabaseService {
  private connection!: Sequelize;

  constructor() {
    try {
      this.connection = new Sequelize({
        dialect: "sqlite",
        storage: "./db.sqlite"
      })
      this.connection.authenticate();
      this.initializeModels()
      console.log("DB connection success")
    } catch {
      console.error("DB connection failure")
    }
  }

  // TODO: Move this to models/Urls
  private initializeModels() {
    this.connection.define("urls", {
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
    })
  }

  public async insertUrl(data :CreateShortUrlData) {
    this.connection.models.urls.create(data)
  }

  public async getUrl(id: string) {
    return this.connection.models.urls.findByPk(id)
  }

  public async incrementUrlVisitCount(id:string) {
    return this.connection.models.urls.increment("visitCount", {
      by: 1,
      where: { id }
    })
  }
}

// Or we can do: export const DBservice = DatabaseService;