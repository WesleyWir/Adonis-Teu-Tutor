import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Student from './Student'
import Educator from './Educator'
import EducatorContactMean from './EducatorContactMean'
import ClassCalendar from './ClassCalendar'

export default class Class extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'educator_id' })
  public educator_id: string;

  @belongsTo(() => Educator, {
    foreignKey: 'educator_id',
  })
  public educator: BelongsTo<typeof Educator>

  @column({ columnName: 'student_id' })
  public student_id: string;

  @belongsTo(() => Student, {
    foreignKey: 'student_id',
  })
  public student: BelongsTo<typeof Student>

  @column({ columnName: 'educator_contact_mean_id' })
  public educator_contact_mean_id: number;

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

  @hasMany(() => ClassCalendar, {
    foreignKey: 'class_id'
  })
  public classCalendars: HasMany<typeof ClassCalendar>
}
