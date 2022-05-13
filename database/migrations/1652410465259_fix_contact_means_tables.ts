import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { ContactMeansCode } from 'Contracts/enums';

export default class FixContactMeansTables extends BaseSchema {
  protected tableName = 'educator_contact_means'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('title')
      table.dropColumn('description')
      table.enum('code', Object.values(ContactMeansCode)).notNullable()
      table.string('value').nullable()
    });
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('code')
      table.dropColumn('value')
      table.string('title', 50).notNullable()
      table.string('description')
    });
  }
}
