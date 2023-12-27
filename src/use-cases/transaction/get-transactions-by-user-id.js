import { userNotFoundResponse } from '../../controllers/helpers/index.js';

export class GetTransactionsByUserIdUseCase {
    constructor(getTransactionsByUserIdRepository, getUserbyIdRepository) {
        this.getTransactionsByUserIdRepository =
            getTransactionsByUserIdRepository;
        this.getUserbyIdRepository = getUserbyIdRepository;
    }

    async execute(params) {
        const user = await this.getUserbyIdRepository.execute(params.userId);

        if (!user) {
            return userNotFoundResponse();
        }

        const transactions =
            await this.getTransactionsByUserIdRepository.execute(params.userId);

        return transactions;
    }
}
