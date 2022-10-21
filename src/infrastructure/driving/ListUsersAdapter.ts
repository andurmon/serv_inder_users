import { APIGatewayProxyResult } from "aws-lambda";
import ListUserCaseUse from "../../domain/ListUsersCaseUse";
import { DynamoDbHandler } from "../driven/DynamoDB/DynamoDbHandler";
import { responseAdapter } from "./Adapter";

const dynamoDbHandler = new DynamoDbHandler();

export const ListUsersAdapter = async (): Promise<APIGatewayProxyResult> => {
    try {

        const caseUse = new ListUserCaseUse(dynamoDbHandler);

        const caseUseResposne = await caseUse.caseUseExecute();
        console.log('caseUseResposne: ', caseUseResposne);
        return responseAdapter(caseUseResposne);

    } catch (error) {
        return responseAdapter({
            statusCode: 500,
            message: error?.message ?? "Somre error ocurred",
            data: {}
        });
    }

}