import type { UsersResponse } from "../types/pocketbase-types";

export function getUserCredits(user: UsersResponse) {

    // display 2 decimal places
    const credits = user.credits / 100;
    return credits.toFixed(2);

}