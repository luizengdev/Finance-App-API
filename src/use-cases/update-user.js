import bcrypt from 'bcrypt';
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js';
import { EmailAlreadyExistsError } from '../errors/user.js';
import { PostgresUpdateUserRepository } from '../repositories/postgres/update-user.js';

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        // TODO: 1. Se o e-mail estiver sendo atualizado, verificar se ele já está em uso.
        if (updateUserParams.email) {
            const postgresGetUserByEmailRepository =
                new PostgresGetUserByEmailRepository();

            const userWithProviderEmail =
                await postgresGetUserByEmailRepository.execute(
                    updateUserParams.email,
                );

            if (userWithProviderEmail && userWithProviderEmail.id !== userId) {
                throw new EmailAlreadyExistsError(updateUserParams.email);
            }
        }

        const user = {
            ...updateUserParams,
        };

        // TODO: 2. Se a senha estiver sendo autalizada, criptografá-la.
        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            );

            user.password = hashedPassword;
        }
        // TODO: 3. Chamar o repository para atualizar o usuário.
        const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

        const updateUser = await postgresUpdateUserRepository.execute(
            userId,
            user,
        );
        return updateUser;
    }
}
