import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Educator from './Educator'

export default class EducatorOptionTool extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public icon: string

  @column()
  public tool: string

  @manyToMany(() => Educator, {
    pivotTable: 'educator_online',
    localKey: 'id',
    pivotForeignKey: 'option_tool_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'educator_id',
  })
  public educators: ManyToMany<typeof Educator>
}
