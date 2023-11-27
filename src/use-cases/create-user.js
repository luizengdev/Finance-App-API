import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js';
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js';

export class CreateUserUseCase {
    async execute(createUserParams) {
        // verificar se o e-mail já está em uso
        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository();

        const userWithProviderEmail =
            await postgresGetUserByEmailRepository.execute(
                createUserParams.email,
            );

        if (userWithProviderEmail) {
            throw new Error('Email already in use');
        }

        // gerar um ID do usario
        const userId = uuidv4();

        // criptografar a senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

        // inserir o usuário no BD
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        };

        // Chamar o repositório
        const postgresCreateUserRepository = new PostgresCreateUserRepository();

        const createdUser = await postgresCreateUserRepository.execute(user);

        return createdUser;
    }
}
