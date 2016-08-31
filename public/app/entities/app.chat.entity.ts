import { UUID } from "angular2-uuid";

export class Chat {
    public _id: UUID;
    public chatFromId = "dogle-scottlogic";
    public chatToId: string;
    public chatToName: string;
    public chatName: string;
    public lastSpoke: Date = new Date();
}
