import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { InPersonTypes } from 'Contracts/enums';

export default class EducatorInPerson extends BaseSchema {
  protected tableName = 'educator_in_person'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('educator_id').references('educators.id').onDelete('CASCADE');
      table.enum('type', Object.values(InPersonTypes)).defaultTo(InPersonTypes.EDUCATOR_LOCAL).notNullable();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
