import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Class from './Class'
import EducatorCalendar from './EducatorCalendar'
import { ClassCalendarStatus } from 'Contracts/enums'

export default class ClassCalendar extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Class, {
    foreignKey: 'class_id',
  })
  public class: BelongsTo<typeof Class>

  @hasOne(() => EducatorCalendar, {
    foreignKey: 'educator_calendar_id'
  })
  public educatorCalendar: HasOne<typeof EducatorCalendar>

  @column()
  public status: ClassCalendarStatus

  @column()
  public note: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
