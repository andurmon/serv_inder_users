import aws from "aws-sdk";
import { ResponsePackage } from "../../../domain/models/models";
import { Env } from "../../../utils/constants"
import { LogHandler } from "../../../utils/Logging";

export class DynamoDbHandler {

    protected dynamoClient: aws.DynamoDB.DocumentClient
    protected dynamodb: aws.DynamoDB;
    protected tableName: string;

    constructor() {
        this.dynamoClient = new aws.DynamoDB.DocumentClient({ region: Env.REGION });
        this.dynamodb = new aws.DynamoDB({ region: Env.REGION });
        this.tableName = Env.USERS_TABLE;
    }

    /**
     * 
     * @param list 
     * @returns 
     */
    async batchWriteDynamo(list: Array<any>) {
        let params = {
            RequestItems: {
                [this.tableName]: list
            }
        }

        console.log('params: ', params);

        return await this.dynamodb.batchWriteItem(params).promise();
    }

    /**
     * 
     * @param list 
     * @returns 
     */
    async putItem(document: string, available: boolean): Promise<ResponsePackage> {
        try {
            const params = {
                TableName: this.tableName,
                Key: { document: document },
                UpdateExpression: 'set #col = :valor',
                ConditionExpression: 'document = :document',
                ExpressionAttributeNames: { '#col': 'available' },
                ExpressionAttributeValues: {
                    ':valor': available,
                    ':document': document
                }
            };

            const upd = await this.dynamoClient.update(params).promise();
            LogHandler.integrationMessage(params, upd, "Dynamo Upd", "Response to update item in Dynamo")
            return { statusCode: 200, data: upd, message: "todo melo" };

        } catch (error) {
            LogHandler.integrationMessage(document, error, "Error during Dynamo DB item update", "Response to update item in Dynamo")
            return { statusCode: 500, data: {}, message: error.message };
        }
    }

    /**
     * @returns
     */
    async batchGetItems(): Promise<ResponsePackage> {
        try {

            let params: aws.DynamoDB.ScanInput = {
                TableName: this.tableName,
                // FilterExpression: ""
            }

            const scan = await this.dynamoClient.scan(params).promise();

            return { statusCode: 200, data: scan, message: "" };
        } catch (error) {
            return { statusCode: 500, data: {}, message: error.message };
        }

    }

}