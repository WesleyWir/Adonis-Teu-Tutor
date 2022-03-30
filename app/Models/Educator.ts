import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid';
import { BaseModel, beforeCreate, beforeSave, column, hasMany, HasMany, hasOne, HasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import ResetEducatorsPasswordToken from './ResetEducatorsPasswordToken';
import EducatorAdress from './EducatorAddress';
import EducatorClassType from './EducatorClassType';

export default class Educator extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column({ columnName: 'average_price' })
  public averagePrice: number

  @column()
  public cpf: string

  @column.date({
    serialize: (value: DateTime) => value ? value.toFormat('yyyy-MM-dd') : value,
  })
  public birthdate: DateTime

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public avatar: string

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => EducatorClassType, {
    foreignKey: 'profileUserId', // defaults to userId
  })
  public classType: HasOne<typeof EducatorClassType>

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
  public static async createUUID(model: Educator) {
    model.id = uuid()
  }

  @beforeSave()
  public static async hashPassword(model: Educator) {
    if (model.$dirty.password) {
      model.password = await Hash.make(model.password)
    }
  }
}
