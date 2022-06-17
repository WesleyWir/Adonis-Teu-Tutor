import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EducatorHasAddresses extends BaseSchema {
  protected tableName = 'educator_has_address'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('educator_id').references('educators.id').onDelete('CASCADE')
      table.integer('address_id').unsigned().references('educator_addresses.id').onDelete('CASCADE')
      table.unique(['educator_id', 'address_id'])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
