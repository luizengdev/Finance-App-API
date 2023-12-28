import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
} from '../helpers/index.js';

export class DeleteTransactionController {
    constructor(deleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase;
    }

    async execute(httpRequest) {
        try {
            const isIdValid = checkIfIdIsValid(
                httpRequest.params.transactionId,
            );

            if (!isIdValid) {
                return invalidIdResponse();
            }

            const deletedTransaction =
                await this.deleteTransactionUseCase.execute(
                    httpRequest.params.transactionId,
                );

            return ok(deletedTransaction);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
