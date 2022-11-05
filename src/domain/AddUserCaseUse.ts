import { DynamoDbHandler } from "../infrastructure/driven/DynamoDB/DynamoDbHandler";
import { LogHandler } from "../utils/Logging";
// import { Env } from "../utils/constants";
import { CaseUseRequestModel, ResponsePackage } from "./models/models";


export default class AddUserCaseUse {

    dynamoManager: DynamoDbHandler;

    constructor(dynamoManager: DynamoDbHandler) {
        this.dynamoManager = dynamoManager;
    }

    async caseUseExecute(request: CaseUseRequestModel): Promise<ResponsePackage> {
        LogHandler.anyMessage(request, "", "");
        LogHandler.errorMessage("Not implemented", "The method you have requested is not available yet. We are working to improve your experience")
        return {
            statusCode: 503,
            message: "Method not yet implemented !",
            data: {}
        };

    }
}

