import { DynamoDbHandler } from "../infrastructure/driven/DynamoDB/DynamoDbHandler";
// import { Env } from "../utils/constants";
import { CaseUseRequestModel, ResponsePackage } from "./models/models";


export default class ListUserCaseUse {

    dynamoHandler: DynamoDbHandler;

    constructor(dynamoHandler: DynamoDbHandler) {
        this.dynamoHandler = dynamoHandler;
    }

    async caseUseExecute(request: CaseUseRequestModel): Promise<ResponsePackage> {
        console.log('request: ', request);

        const listItems = await this.dynamoHandler.batchGetItems();

        return listItems;
    }
}

