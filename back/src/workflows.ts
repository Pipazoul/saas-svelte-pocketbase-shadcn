// Add Workflow Definitions here.
import * as workflow from '@temporalio/workflow';
import type * as activities from './activities';


const {
   // User
   decrementUsersCredits
} = workflow.proxyLocalActivities<typeof activities>({
    startToCloseTimeout: '20s',
    retry: {
        maximumAttempts: 2,
    }
});

export async function watchUsers(): Promise<any> {
  console.log("👥 👀 Watching Users");
  await decrementUsersCredits();
}