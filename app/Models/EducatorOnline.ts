import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Educator from './Educator'
import EducatorOptionTool from './EducatorOptionTool'

export default class EducatorOnline extends BaseModel {
  public static table = 'educator_online'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'educator_id' })
  public educator_id: string;

  @column({ columnName: 'educator_options_tool_id' })
  public educator_options_tool_id: number;

  @belongsTo(() => Educator, {
    foreignKey: 'educator_id',
  })
  public educator: BelongsTo<typeof Educator>

  @belongsTo(() => EducatorOptionTool, {
    foreignKey: 'educator_options_tool_id',
  })
  public educatorOptionTool: BelongsTo<typeof EducatorOptionTool>

  @column()
  public target: string
}
