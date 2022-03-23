import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Educator from './Educator';

export default class ResetEducatorsPasswordToken extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public token: string

  @column({ columnName: 'educator_id' })
  public educatorId: string;

  @belongsTo(() => Educator, {
    foreignKey: 'educatorId',
  })
  public student: BelongsTo<typeof Educator>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
