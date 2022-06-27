import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { ClassTypes } from 'Contracts/enums';

export default class AddClassTypeToClassCalendars extends BaseSchema {
  protected tableName = 'educator_calendars'

  public async up () {
      this.schema.alterTable(this.tableName, (table) => {
        table.enum('type', Object.values(ClassTypes));
      });
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('type');
    });
  }
}
