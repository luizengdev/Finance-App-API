import bcrypt from 'bcrypt';
import { EmailAlreadyExistsError } from '../errors/user.js';

export class UpdateUserUseCase {
    constructor(getUserByEmailRepository, updateUserRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.updateUserRepository = updateUserRepository;
    }

    async execute(userId, updateUserParams) {
        // TODO: 1. Se o e-mail estiver sendo atualizado, verificar se ele já está em uso.
        if (updateUserParams.email) {
            const userWithProviderEmail =
                await this.postgresGetUserByEmailRepository.execute(
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
        const updateUser = await this.updateUserRepository.execute(
            userId,
            user,
        );
        return updateUser;
    }
}
