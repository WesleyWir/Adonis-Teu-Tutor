import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddDescriptionToEducators extends BaseSchema {
  protected tableName = 'educators';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('description').after('password')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName,  (table) => {
      table.dropColumn('description')
    })
  }
}
