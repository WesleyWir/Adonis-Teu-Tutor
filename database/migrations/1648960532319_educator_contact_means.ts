import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EducatorContactMeans extends BaseSchema {
  protected tableName = 'educator_contact_means'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('educator_id').references('educators.id')
      table.string('title', 50).notNullable()
      table.string('description')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
