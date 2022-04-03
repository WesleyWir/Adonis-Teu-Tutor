import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class EducatorOptionTool extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public icon: string

  @column()
  public tool: string
}
