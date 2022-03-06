import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ResetStudentsPasswordTokens extends BaseSchema {
  protected tableName = 'reset_students_password_tokens'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('token', 255).notNullable().unique()
      table.string('student_id').unsigned().references('id').inTable('students').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
