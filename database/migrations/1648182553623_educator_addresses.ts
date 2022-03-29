import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EducatorAdresses extends BaseSchema {
  protected tableName = 'educator_addresses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('country').notNullable()
      table.string('region').notNullable()
      table.string('city').notNullable()
      table.string('neighborhood').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
