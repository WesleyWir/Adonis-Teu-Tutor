import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Educator from './Educator'

export default class EducatorAddress extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public country: string

  @column()
  public region: string

  @column()
  public city: string

  @column()
  public neighborhood: string

  @manyToMany(() => Educator, {
    pivotTable: 'educator_has_address',
    localKey: 'id',
    pivotForeignKey: 'address_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'educator_id',
    pivotTimestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  })
  public educators: ManyToMany<typeof Educator>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
