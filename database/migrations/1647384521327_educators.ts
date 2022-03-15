import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Educators extends BaseSchema {
  protected tableName = 'educators'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().unique();
      table.string('name', 100).notNullable()
      table.string('cpf', 15).notNullable().unique()
      table.date('birthdate').notNullable()
      table.string('email', 200).notNullable().unique()
      table.string('password')
      table.string('avatar')
      table.tinyint('status').defaultTo(1) // TODO: change to 0 and send email confirmation...
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
