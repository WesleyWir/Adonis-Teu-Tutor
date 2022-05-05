import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RemoveCpfAttributeFromStudents extends BaseSchema {
  protected tableName = 'students'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('cpf')
    });
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.string('cpf', 15).notNullable().unique()
    });
  }
}
