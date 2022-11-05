import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import UpdUsersCasUse from "../../domain/UpdUserCaseUse";
import { JoiSchema } from "../../domain/models/JoiSchema";
import { DynamoDbHandler } from "../driven/DynamoDB/DynamoDbHandler";
import { responseAdapter } from "./Adapter";
import { LogHandler } from "../../utils/Logging";

const dynamoDbHandler = new DynamoDbHandler();

export const UpdUsersAdapter = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    LogHandler.getInstance();

    try {
        LogHandler.requestMessage(event);

        const schema = JoiSchema.updUserSchema;
        const caseUse = new UpdUsersCasUse(dynamoDbHandler);
        const body = (event.body ? JSON.parse(event.body) : undefined);

        if (!body) {
            const resp = { statusCode: 400, message: "Body is null or undefined", data: {} };
            LogHandler.responseMessage(resp);
            return responseAdapter(resp);
        }

        const validation = JoiSchema.validateSchema(schema, body);
        if (!validation.valid) {
            const resp = { statusCode: 400, message: validation?.message || "Error validating Schema", data: {} }
            LogHandler.responseMessage(resp);
            return responseAdapter(resp);
        }

        const caseUseResposne = await caseUse.caseUseExecute(body);
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