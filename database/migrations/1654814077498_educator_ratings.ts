import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { PossibleEducatorRate } from 'Contracts/enums'

export default class EducatorRatings extends BaseSchema {
  protected tableName = 'educator_ratings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('student_id').references('id').inTable('students').onDelete('CASCADE').onUpdate('CASCADE')
      table.string('educator_id').references('id').inTable('educators').onDelete('CASCADE').onUpdate('CASCADE')
      table.text('comment')
      table.enum('rate', Object.values(PossibleEducatorRate)).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
