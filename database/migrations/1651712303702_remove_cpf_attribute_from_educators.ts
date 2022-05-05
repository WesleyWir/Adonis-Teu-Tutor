import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RemoveCpfAttributeFromEducators extends BaseSchema {
  protected tableName = 'educators'

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
