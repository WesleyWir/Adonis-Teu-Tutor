import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Student from './Student';

export default class ResetStudentsPasswordToken extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public token: string

  @column({ columnName: 'student_id' })
  public studentId: string;

  @belongsTo(() => Student, {
    foreignKey: 'studentId',
  })
  public student: BelongsTo<typeof Student>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
