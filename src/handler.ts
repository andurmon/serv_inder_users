import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { JoiSchema } from "./domain/models/JoiSchema";

import AddUserCaseUse from "./domain/AddUserCaseUse";
import { ResponsePackage } from "./domain/models/models";
import { DynamoDbHandler } from "./infrastructure/driven/DynamoDB/DynamoDbHandler";
import ListUserCaseUse from "./domain/ListUsersCaseUse";
import UpdUserCaseUse from "./domain/UpdUserCaseUse";

function responseAdapter(response: ResponsePackage): APIGatewayProxyResult {
    return {
        body: JSON.stringify(response),
        statusCode: response.statusCode,
        headers: { "Content-Type": "application/json" }
    }
}

export const handler = async (event: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayProxyResult> => {
    try {
        if (context) {
            console.log(context);
        }

        const body = (event.body ? JSON.parse(event.body) : undefined);
        if (!body) return responseAdapter({ statusCode: 400, message: "Body is null or undefined", data: {} });
        if (!event.httpMethod) return responseAdapter({ statusCode: 400, message: "httpMethod is null or undefined", data: {} });

        const dynamoDbHandler = new DynamoDbHandler();

        let caseUse: AddUserCaseUse | ListUserCaseUse | UpdUserCaseUse;
        let schema: any;

        switch (event.httpMethod) {
            case "GET":
                caseUse = new ListUserCaseUse(dynamoDbHandler);
                schema = JoiSchema.listUserSchema
                break;
            case "POST":
                caseUse = new AddUserCaseUse(dynamoDbHandler);
                schema = JoiSchema.addUserSchema
                break;
            case "PUT":
                caseUse = new UpdUserCaseUse(dynamoDbHandler);
                schema = JoiSchema.updUserSchema
                break;
            default:
                return responseAdapter({ statusCode: 405, message: `Method ${event.httpMethod} not allowed`, data: {} });
        }

        const validation = JoiSchema.validateSchema(schema, body);
        if (!validation.valid) {
            return responseAdapter({
                statusCode: 400, message: validation?.message || "Error validating Schema", data: {}
            });
        }

        const caseUseResposne = await caseUse.caseUseExecute(body);
        console.log('caseUseResposne: ', caseUseResposne);
        return responseAdapter(caseUseResposne);


    } catch (error) {
        console.log('error: ', error);
        return responseAdapter({
            statusCode: 500,
            message: "Somre rror ocurred",
            data: {}
        });

    }

}