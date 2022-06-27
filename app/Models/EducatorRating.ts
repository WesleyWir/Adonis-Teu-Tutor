import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Student from './Student'
import Educator from './Educator'
import { PossibleEducatorRate } from 'Contracts/enums'

export default class EducatorRating extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Student, {
    foreignKey: 'student_id',
  })
  public student: BelongsTo<typeof Student>

  @column({ columnName: 'educator_id' })
  public educator_id: string;

  @column({ columnName: 'student_id' })
  public student_id: string;

  @belongsTo(() => Educator, {
    foreignKey: 'educator_id',
  })
  public educator: BelongsTo<typeof Educator>

  @column()
  public rate: PossibleEducatorRate

  @column()
  public comment: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
