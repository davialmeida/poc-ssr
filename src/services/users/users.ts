import axios from "axios";
import { UserDto } from "./types";

export class UsersService {
    static async get() {
        return axios.get<UserDto[]>('https://api.github.com/users').then(res => res.data)
    }
}