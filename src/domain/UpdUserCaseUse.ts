import { DynamoDbHandler } from "../infrastructure/driven/DynamoDB/DynamoDbHandler";
import { CaseUseRequestModel, ResponsePackage } from "./models/models";


export default class UpdUserCaseUse {

    dynamoDbHandler: DynamoDbHandler;

    constructor(s3Manager: DynamoDbHandler) {
        this.dynamoDbHandler = s3Manager;
    }

    async caseUseExecute(request: CaseUseRequestModel): Promise<ResponsePackage> {
        console.log('request: ', request);

        return {
            statusCode: 503,
            message: "Method not yet implemented !",
            data: {}
        };

    }
}

