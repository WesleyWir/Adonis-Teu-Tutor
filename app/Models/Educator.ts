import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid';
import { BaseModel, beforeCreate, beforeSave, column, hasMany, HasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import ResetEducatorsPasswordToken from './ResetEducatorsPasswordToken';
import EducatorAdress from './EducatorAddress';

export default class Educator extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public cpf: string

  @column.date({
    serialize: (value: DateTime) => value ? value.toFormat('yyyy-MM-dd') : value,
  })
  public birthdate: DateTime

  @column()
  public email: string

  @column({serializeAs: null})
  public password: string

  @column()
  public avatar: string

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => ResetEducatorsPasswordToken, {
    foreignKey: 'educatorId'
  })
  public tokens: HasMany<typeof ResetEducatorsPasswordToken>

  @manyToMany(() => EducatorAdress, {
    pivotTable: 'educator_has_address',
    localKey: 'id',
    pivotForeignKey: 'educator_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'address_id',
    pivotTimestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  })
  public addresses: ManyToMany<typeof EducatorAdress>

  @beforeCreate()
  public static async createUUID (model: Educator) {
    model.id = uuid()
  }

  @beforeSave()
  public static async hashPassword (model: Educator) {
    if (model.$dirty.password) {
      model.password = await Hash.make(model.password)
    }
  }
}
