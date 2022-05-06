import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddSubjectToEducatorModels extends BaseSchema {
  protected tableName = 'educators';
  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('subject_id').unsigned().references('id').inTable('subjects').onDelete('CASCADE').after('avatar')
    });
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('subject_id');
    });
  }
}
