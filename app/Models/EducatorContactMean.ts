import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { ContactMeansCode } from 'Contracts/enums';
import Class from './Class';
import Educator from './Educator'

export default class EducatorContactMean extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'educator_id' })
  public educator_id: string;

  @belongsTo(() => Educator, {
    foreignKey: 'educator_id',
  })
  public educator: BelongsTo<typeof Educator>

  @hasMany(() => Class, {
    foreignKey: 'educator_contact_mean_id'
  })
  public classes: HasMany<typeof Class>

  @column()
  public code: ContactMeansCode

  @column()
  public value: string
}
