import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { ClassTypes } from 'Contracts/enums';

export default class EducatorClassTypes extends BaseSchema {
  protected tableName = 'educator_class_types'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('educator_id').references('educators.id').onDelete('CASCADE');
      table.enum('type', Object.values(ClassTypes)).defaultTo(ClassTypes.ONLINE).notNullable();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
