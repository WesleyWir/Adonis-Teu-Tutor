import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RenameRegionToStates extends BaseSchema {
  protected tableName = 'educator_addresses'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.renameColumn('region', 'state')
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.renameColumn('state', 'region')
    })
  }
}
