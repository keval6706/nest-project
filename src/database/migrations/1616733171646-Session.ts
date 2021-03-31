import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class Session1616733171646 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_sessions',
        columns: [
          {
            name: 'id',
            type: 'character varying',
            length: '255',
            isPrimary: true,
          },
          {
            name: 'expiredAt',
            type: 'bigint',
          },
          {
            name: 'json',
            type: 'text',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'user_sessions',
      new TableIndex({
        columnNames: ['json'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_sessions');
  }
}
