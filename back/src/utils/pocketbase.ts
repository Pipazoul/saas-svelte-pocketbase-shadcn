import { TypedPocketBase } from "../types/pocketbase-types";
const PocketBase = require('pocketbase/cjs')

const url = process.env.PRIVATE_POCKETBASE_URL;
const login = process.env.PRIVATE_POCKETBASE_IDENTITY || "";
const password = process.env.PRIVATE_POCKETBASE_PASSWORD || "";
export const pb: TypedPocketBase = new PocketBase(url);

// globally disable auto cancellation
pb.autoCancellation(false);
// eslint-disable-next-line @typescript-eslint/no-floating-promises
pb.admins.authWithPassword(login, password);

