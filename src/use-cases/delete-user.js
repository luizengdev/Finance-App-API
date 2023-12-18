import { PostgresDeleteUserRepository } from '../repositories/postgres/index.js';

export class DeleteUserUseCase {
    async execute(userId) {
        const postgresDeleteUserdRepository =
            new PostgresDeleteUserRepository();

        const deletedUser = await postgresDeleteUserdRepository.execute(userId);

        return deletedUser;
    }
}
