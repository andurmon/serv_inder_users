import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import ListUserCaseUse from "../../domain/ListUsersCaseUse";
import { LogHandler } from "../../utils/Logging";
import { DynamoDbHandler } from "../driven/DynamoDB/DynamoDbHandler";
import { responseAdapter } from "./Adapter";

const dynamoDbHandler = new DynamoDbHandler();

export const ListUsersAdapter = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    LogHandler.getInstance();

    try {
        LogHandler.requestMessage(event);

        const caseUse = new ListUserCaseUse(dynamoDbHandler);

        const caseUseResposne = await caseUse.caseUseExecute();
        LogHandler.responseMessage(caseUseResposne);
        return responseAdapter(caseUseResposne);

    } catch (error) {
        return responseAdapter({
            statusCode: 500,
            message: error?.message ?? "Somre error ocurred",
            data: {}
        });
    }

}