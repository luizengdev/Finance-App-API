import { PostgresHelper } from '../../../db/postgres/helper.js';

export class PostgresGetUserBalanceRepository {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId) {
        const balance = await PostgresHelper.query(
            `SELECT * FROM get_user_balance($1)`,
            [userId],
        );

        return {
            userId,
            ...balance[0],
        };
    }
}
