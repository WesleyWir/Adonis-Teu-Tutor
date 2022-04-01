import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EducatorOptionTools extends BaseSchema {
  protected tableName = 'educator_option_tools'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('icon')
      table.string('tool').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
