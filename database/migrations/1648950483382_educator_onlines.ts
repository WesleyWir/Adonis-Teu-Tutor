import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EducatorOnlines extends BaseSchema {
  protected tableName = 'educator_online'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('educator_id').references('educators.id')
      table.integer('educator_options_tool_id').unsigned().references('educator_option_tools.id')
      table.string('target')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
