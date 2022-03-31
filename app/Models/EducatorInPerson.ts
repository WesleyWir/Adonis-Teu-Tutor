import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Educator from './Educator'
import { InPersonTypes } from 'Contracts/enums'

export default class EducatorInPerson extends BaseModel {
  public static table = 'educator_in_person'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'educator_id' })
  public educatorId: string;

  @belongsTo(() => Educator, {
    foreignKey: 'educator_id',
  })
  public educator: BelongsTo<typeof Educator>

  @column()
  public type: InPersonTypes
}
