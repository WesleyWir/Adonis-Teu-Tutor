import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Student from './Student'
import Subject from './Subject'
import { v4 as uuid } from 'uuid';

export default class StudentPost extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @belongsTo(() => Student, {
    foreignKey: 'studentId',
  })
  public student: BelongsTo<typeof Student>

  @belongsTo(() => Subject, {
    foreignKey: 'subjectId',
  })
  public subject: BelongsTo<typeof Subject>

  @column()
  public title: string

  @column()
  public content: string

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID (model: Student) {
    model.id = uuid()
  }
}
