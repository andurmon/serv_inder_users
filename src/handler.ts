import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { responseAdapter } from "./infrastructure/driving/Adapter";
import { AddUsersAdapter } from "./infrastructure/driving/AddUsersAdapter";
import { ListUsersAdapter } from "./infrastructure/driving/ListUsersAdapter";
import { UpdUsersAdapter } from "./infrastructure/driving/UpdUsersAdapter";

export const handler = async (event: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayProxyResult> => {
    try {
        if (context) {
            console.log(context);
        }

        if (!event.httpMethod) return responseAdapter({ statusCode: 400, message: "httpMethod is null or undefined", data: {} });

        switch (event.httpMethod) {
            case "GET":
                return await ListUsersAdapter(event);
            case "POST":
                return await AddUsersAdapter(event);
            case "PUT":
                return await UpdUsersAdapter(event);
            default:
                return responseAdapter({ statusCode: 405, message: `Method ${event.httpMethod} not allowed`, data: {} });
        }


    } catch (error) {
        return responseAdapter({
            statusCode: 500,
            message: error?.message ?? "Somre rror ocurred",
            data: {}
        });

    }

}