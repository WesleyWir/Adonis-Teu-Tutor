import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid';
import { BaseModel, beforeCreate, beforeSave, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import ResetStudentsPasswordToken from './ResetStudentsPasswordToken';
import StudentPost from './StudentPost';

export default class Student extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column.date({
    serialize: (value: DateTime) => value ? value.toFormat('yyyy-MM-dd') : value,
  })
  public birthdate: DateTime

  @column()
  public email: string

  @column({serializeAs: null})
  public password: string

  @column()
  public avatar: string

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => ResetStudentsPasswordToken, {
    foreignKey: 'studentId'
  })
  public tokens: HasMany<typeof ResetStudentsPasswordToken>

  @hasMany(() => StudentPost, {
    onQuery: (query) => {
      query.where('status', true)
    },
    foreignKey: 'studentId'
  })
  public posts: HasMany<typeof StudentPost>

  @beforeCreate()
  public static async createUUID (model: Student) {
    model.id = uuid()
  }

  @beforeSave()
  public static async hashPassword (model: Student) {
    if (model.$dirty.password) {
      model.password = await Hash.make(model.password)
    }
  }
}
