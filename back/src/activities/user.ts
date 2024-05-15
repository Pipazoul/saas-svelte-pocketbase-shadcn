import { pb } from "../utils/pocketbase";

export async function decrementUsersCredits() {
  const users = await pb.collection("users").getFullList();
  for (const user of users) {
    await pb.collection("users").update(user.id, { credits: user.credits - 1 });
  } 
} 