import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class StudentPosts extends BaseSchema {
  protected tableName = 'student_posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().unique();
      table.string('student_id').references('id').inTable('students').onDelete('CASCADE')
      table.integer('subject_id').unsigned().references('id').inTable('subjects').onDelete('CASCADE')
      table.string('title').notNullable()
      table.text('content')
      table.tinyint('status').notNullable().defaultTo(1)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
