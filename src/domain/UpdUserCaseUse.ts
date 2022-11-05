import { DynamoDbHandler } from "../infrastructure/driven/DynamoDB/DynamoDbHandler";
import { UpdUsersRequestModel, ResponsePackage } from "./models/models";


export default class UpdUserCaseUse {

    dynamoDbHandler: DynamoDbHandler;

    constructor(s3Manager: DynamoDbHandler) {
        this.dynamoDbHandler = s3Manager;
    }

    async caseUseExecute(request: UpdUsersRequestModel): Promise<ResponsePackage> {
        const updateItem = await this.dynamoDbHandler.putItem(request.document, request.available);
        return updateItem;
    }
}

