import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class EducatorAdress extends BaseModel {
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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
