import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EducatorPostInterests extends BaseSchema {
  protected tableName = 'educator_post_interests'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('educator_id').references('educators.id').onDelete('CASCADE')
      table.string('student_post_id').references('student_posts.id').onDelete('CASCADE')
      table.unique(['educator_id', 'student_post_id'])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
