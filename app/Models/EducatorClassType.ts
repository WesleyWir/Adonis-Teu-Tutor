import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { ClassTypes } from 'Contracts/enums'
import Educator from './Educator'

export default class EducatorClassType extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'educator_id' })
  public educatorId: string;

  @belongsTo(() => Educator, {
    foreignKey: 'educator_id',
  })
  public educator: BelongsTo<typeof Educator>

  @column()
  public type: ClassTypes

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
