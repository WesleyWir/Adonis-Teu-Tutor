import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EducatorCalendars extends BaseSchema {
  protected tableName = 'educator_calendars'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('educator_id').references('id').inTable('educators').notNullable()
      table.date('date').notNullable()
      table.time('start_time').notNullable()
      table.time('end_time').notNullable()
      table.decimal('price').notNullable()
      table.boolean('status').defaultTo(1)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
