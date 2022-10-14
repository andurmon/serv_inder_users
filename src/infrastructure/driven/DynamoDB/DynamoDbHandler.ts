import aws from "aws-sdk";
import { Env } from "../../../utils/constants"


export class DynamoDbHandler {

    protected dynamodb: aws.DynamoDB;
    protected tableName: string;

    constructor() {
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
    async putItem(item: any) {

        let params = {
            Item: item,
            ReturnConsumedCapacity: "TOTAL",
            TableName: this.tableName
        }

        console.log('params: ', params);

        return await this.dynamodb.putItem(params).promise();
    }

    /**
     * @returns
     */
    async batchGetItems() {

        let params = {
            RequestItems: {
                [this.tableName]: {
                    Keys: [
                        // {
                        //     "Artist": {
                        //         S: "No One You Know"
                        //     },
                        //     "SongTitle": {
                        //         S: "Call Me Today"
                        //     }
                        // },
                        // {
                        //     "Artist": {
                        //         S: "Acme Band"
                        //     },
                        //     "SongTitle": {
                        //         S: "Happy Day"
                        //     }
                        // },
                        // {
                        //     "Artist": {
                        //         S: "No One You Know"
                        //     },
                        //     "SongTitle": {
                        //         S: "Scared of My Shadow"
                        //     }
                        // }
                    ],
                    // ProjectionExpression: "AlbumTitle"
                }
            }
        };

        console.log('params: ', params);

        return await this.dynamodb.batchGetItem(params).promise();
    }

}