import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Students extends BaseSchema {
  protected tableName = 'students'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().unique();
      table.string('name').notNullable()
      table.string('cpf').notNullable().unique()
      table.date('birthdate').notNullable()
      table.string('email').notNullable().unique()
      table.string('password')
      table.string('avatar')
      table.tinyint('status').defaultTo(1)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
