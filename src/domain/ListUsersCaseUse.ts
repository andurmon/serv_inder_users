import { DynamoDbHandler } from "../infrastructure/driven/DynamoDB/DynamoDbHandler";
// import { Env } from "../utils/constants";
import { ResponsePackage } from "./models/models";


export default class ListUserCaseUse {

    dynamoHandler: DynamoDbHandler;

    constructor(dynamoHandler: DynamoDbHandler) {
        this.dynamoHandler = dynamoHandler;
    }

    async caseUseExecute(): Promise<ResponsePackage> {
        const listItems = await this.dynamoHandler.batchGetItems();
        return listItems;
    }
}

