import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { ClassCalendarStatus } from 'Contracts/enums'

export default class ClassCalendars extends BaseSchema {
  protected tableName = 'class_calendars'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('class_id').unsigned().references('id').inTable('classes').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('educator_calendar_id').unsigned().references('id').inTable('educator_calendars').onDelete('CASCADE').onUpdate('CASCADE')
      table.enum('status', Object.values(ClassCalendarStatus)).notNullable().defaultTo(ClassCalendarStatus.TO_DO)
      table.string('note').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
