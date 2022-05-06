import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid';
import { BaseModel, beforeCreate, beforeSave, BelongsTo, belongsTo, column, hasMany, HasMany, hasOne, HasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import ResetEducatorsPasswordToken from './ResetEducatorsPasswordToken';
import EducatorAdress from './EducatorAddress';
import EducatorClassType from './EducatorClassType';
import EducatorInPerson from './EducatorInPerson';
import EducatorOnline from './EducatorOnline';
import EducatorContactMean from './EducatorContactMean';
import StudentPost from './StudentPost';
import EducatorCalendar from './EducatorCalendar';
import EducatorPaymentPix from './EducatorPaymentPix';
import Subject from './Subject';

export default class Educator extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column({ columnName: 'average_price' })
  public averagePrice: number

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

  @belongsTo(() => Subject, {
    foreignKey: 'subject_id',
  })
  public subject: BelongsTo<typeof Subject>

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => EducatorClassType)
  public classType: HasOne<typeof EducatorClassType>

  @hasOne(() => EducatorInPerson)
  public inPerson: HasOne<typeof EducatorInPerson>

  @hasOne(() => EducatorPaymentPix)
  public pix: HasOne<typeof EducatorPaymentPix>

  @hasMany(() => ResetEducatorsPasswordToken, {
    foreignKey: 'educatorId'
  })
  public tokens: HasMany<typeof ResetEducatorsPasswordToken>

  @hasMany(() => EducatorCalendar, {
    foreignKey: 'educator_id'
  })
  public educatorCalendars: HasMany<typeof EducatorCalendar>

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

  @hasMany(() => EducatorOnline, {
    foreignKey: 'educator_id'
  })
  public onlineTools: HasMany<typeof EducatorOnline>

  @hasMany(() => EducatorContactMean, {
    foreignKey: 'educator_id'
  })
  public contactMeans: HasMany<typeof EducatorContactMean>

  @manyToMany(() => StudentPost, {
    pivotTable: 'educator_post_interests',
    localKey: 'id',
    pivotForeignKey: 'educator_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'student_post_id',
    pivotTimestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  })
  public postInterest: ManyToMany<typeof StudentPost>

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
