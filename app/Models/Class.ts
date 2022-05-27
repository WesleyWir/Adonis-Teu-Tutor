import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Student from './Student'
import Educator from './Educator'
import EducatorContactMean from './EducatorContactMean'

export default class Class extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Educator, {
    foreignKey: 'educator_id',
  })
  public educator: BelongsTo<typeof Educator>

  @belongsTo(() => Student, {
    foreignKey: 'student_id',
  })
  public student: BelongsTo<typeof Student>

  @belongsTo(() => EducatorContactMean, {
    foreignKey: 'educator_contact_mean_id',
  })
  public contact_mean: BelongsTo<typeof EducatorContactMean>

  @column()
  public note: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
