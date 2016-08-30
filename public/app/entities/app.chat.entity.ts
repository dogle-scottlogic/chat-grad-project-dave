import { UUID } from "angular2-uuid";

export class Chat {
    public id: UUID;
    public name: string;
    public contact: string;
    public lastSpoke: Date;
}
