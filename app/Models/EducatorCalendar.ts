import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';
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
      serialize: (value: string) => value ? value.trim() : value,
    })
  public startTime: DateTime

  @column.date({
    columnName: 'end_time', serialize: (value: string) => value ? value.trim() : value,
  })
  public endTime: DateTime

  @column()
  public price: number

  @column()
  public status: boolean
}
