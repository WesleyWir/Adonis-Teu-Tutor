import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { PixKeyType } from 'Contracts/enums'

export default class EducatorPaymentPixes extends BaseSchema {
  protected tableName = 'educator_payment_pix'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('educator_id').references('id').inTable('educators').notNullable()
      table.enum('key_type', Object.values(PixKeyType)).notNullable()
      table.string('value').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
