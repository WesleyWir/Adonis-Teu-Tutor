import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { PixKeyType } from 'Contracts/enums'
import Educator from './Educator';

export default class EducatorPaymentPix extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'educator_id' })
  public educator_id: string

  @column({ columnName: 'key_type' })
  public keyType: PixKeyType

  @column()
  public value: string

  @belongsTo(() => Educator, {
    foreignKey: 'educator_id',
  })
  public educator: BelongsTo<typeof Educator>
}
