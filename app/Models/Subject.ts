import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import StudentPost from './StudentPost';

export default class Subject extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public subject: string;

  @hasMany(() => StudentPost, {
    foreignKey: 'subjectId'
  })
  public posts: HasMany<typeof StudentPost>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
