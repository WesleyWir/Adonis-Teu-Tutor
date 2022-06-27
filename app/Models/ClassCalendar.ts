import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Class from './Class'
import EducatorCalendar from './EducatorCalendar'
import { ClassCalendarStatus, ClassTypes } from 'Contracts/enums'

export default class ClassCalendar extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'class_id' })
  public class_id: number;

  @belongsTo(() => Class, {
    foreignKey: 'class_id',
  })
  public class: BelongsTo<typeof Class>

  @column({ columnName: 'educator_calendar_id' })
  public educator_calendar_id: number;

  @belongsTo(() => EducatorCalendar, {
    foreignKey: 'educator_calendar_id'
  })
  public educatorCalendar: BelongsTo<typeof EducatorCalendar>

  @column()
  public status: ClassCalendarStatus

  @column()
  public note: string

  @column()
  public type: ClassTypes

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
