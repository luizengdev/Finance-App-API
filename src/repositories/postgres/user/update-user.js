import { PostgresHelper } from '../../../db/postgres/helper.js';

export class PostgresUpdateUserRepository {
    // A função começa criando duas matrizes vazias: updateFields e updateValues. Em seguida, ela itera sobre as chaves do objeto updateUserParams
    // e adiciona uma string formatada para cada chave à matriz updateFields. A string formatada é da forma ${key} = $${updateFields.length + 1}.
    // Isso significa que o primeiro campo a ser atualizado terá o valor $1, o segundo $2, e assim por diante. A função também adiciona o valor correspondente a cada chave à matriz updateValues.
    async execute(userId, updateUserParams) {
        const updateFields = [];
        const updateValues = [];

        Object.keys(updateUserParams).forEach((key) => {
            updateFields.push(`${key} = $${updateFields.length + 1}`);
            updateValues.push(updateUserParams[key]);
        });

        updateValues.push(userId);

        const updateQuery = `
            UPDATE users
            SET ${updateFields.join(', ')}
            WHERE id = $${updateValues.length}
            RETURNING *
        `;

        // Por fim, a função executa a consulta usando o método query do objeto PostgresHelper e retorna o registro atualizado.
        const updateUser = await PostgresHelper.query(
            updateQuery,
            updateValues,
        );

        return updateUser[0];
    }
}
