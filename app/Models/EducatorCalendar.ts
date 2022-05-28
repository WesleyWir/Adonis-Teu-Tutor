import { BaseModel, BelongsTo, belongsTo, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';
import ClassCalendar from './ClassCalendar';
import Educator from './Educator';

export default class EducatorCalendar extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'educator_id' })
  public educator_id: string;

  @belongsTo(() => Educator, {
    foreignKey: 'educator_id',
  })
  public educator: BelongsTo<typeof Educator>

  @column.date({
    serialize: (value: DateTime) => value ? value.toFormat('yyyy-MM-dd') : value,
  })
  public date: DateTime

  @column.date(
    {
      columnName: 'start_time',
      serialize: (value: DateTime) => typeof value === 'string' ? value : value.toFormat('HH:mm'),
    })
  public startTime: DateTime

  @column.date({
    columnName: 'end_time', serialize: (value: DateTime) => typeof value === 'string' ? value : value.toFormat('HH:mm'),
  })
  public endTime: DateTime

  @column()
  public price: number

  @column()
  public status: boolean

  @hasOne(() => ClassCalendar, {
    foreignKey: 'educator_calendar_id'
  })
  public classCalendars: HasOne<typeof ClassCalendar>
}
