import { IGame } from './igame';

// export interface IProfileData {
//     _id: string;
//     email: string;
//     backlog: string[];
// }

export interface IUserData {
    email?: string;
    nickname?: string;
}

export class User implements IUserData  {
    email: string;
    nickname: string;
    backlog: string[];

    constructor(email: string, nickname: string, backlog: string[]) {
        this.email = email;
        this.nickname = nickname;
        this.backlog = backlog;
    }
}
