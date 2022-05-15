import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RemoveTargetFromOnlineEducators extends BaseSchema {
  protected tableName = 'educator_online'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('target')
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.string('target')
    })
  }
}
