require("dotenv").config();

export abstract class Env {
    static readonly REGION: string = <string>process?.env?.REGION;
    static readonly STAGE: string = <string>process?.env?.STAGE;
    static readonly USERS_TABLE: string = <string>process?.env?.USERS_TABLE;
}



export class DocumentTypeCatalogAthletes {
    static getDocTypeAthl(key: "CC" | "TI" | "CE"): string {
        switch (key) {
            case "CC":
                return "6";
                break;
            case "TI":
                return "4";
                break;
            case "CE":
                return "7";
                break;
            default:
                return ""
                break;
        }
    }
}
