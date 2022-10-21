import { APIGatewayProxyResult } from "aws-lambda";
import { ResponsePackage } from "../../domain/models/models";

export function responseAdapter(response: ResponsePackage): APIGatewayProxyResult {
    return {
        body: JSON.stringify(response),
        statusCode: response.statusCode,
        headers: { "Content-Type": "application/json" }
    }
}