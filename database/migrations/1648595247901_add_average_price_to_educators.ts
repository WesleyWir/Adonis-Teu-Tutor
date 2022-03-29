import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddAveragePriceToEducators extends BaseSchema {
  protected tableName = 'educators';
  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.decimal('average_price').after('avatar');
    });
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('average_price');
    });
  }
}
