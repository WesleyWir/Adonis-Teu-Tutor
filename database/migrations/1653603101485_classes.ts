import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Classes extends BaseSchema {
  protected tableName = 'classes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('educator_id').references('id').inTable('educators').onDelete('CASCADE')
      table.string('student_id').references('id').inTable('students').onDelete('CASCADE')
      table.integer('educator_contact_mean_id').unsigned().references('id').inTable('educator_contact_means').onDelete('CASCADE')
      table.string('note').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
