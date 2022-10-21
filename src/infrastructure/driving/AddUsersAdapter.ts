import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import ListUserCaseUse from "../../domain/AddUserCaseUse";
import { JoiSchema } from "../../domain/models/JoiSchema";
import { DynamoDbHandler } from "../driven/DynamoDB/DynamoDbHandler";
import { responseAdapter } from "./Adapter";

const dynamoDbHandler = new DynamoDbHandler();

export const AddUsersAdapter = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {

        const schema = JoiSchema.addUserSchema;
        const caseUse = new ListUserCaseUse(dynamoDbHandler);
        const body = (event.body ? JSON.parse(event.body) : undefined);

        if (!body) return responseAdapter({ statusCode: 400, message: "Body is null or undefined", data: {} });

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
        return responseAdapter({
            statusCode: 500,
            message: error?.message ?? "Somre error ocurred",
            data: {}
        });
    }

}