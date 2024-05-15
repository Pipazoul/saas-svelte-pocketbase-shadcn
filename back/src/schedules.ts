import { Connection, Client, ScheduleOverlapPolicy } from '@temporalio/client';
import { watchUsers } from './workflows';

async function run() {
    const temporalHost = process.env.TEMPORAL_ADDRESS;
    // Connect to the default Server location
    const client = new Client({
    connection: await Connection.connect({address: temporalHost }),
    });

  //https://typescript.temporal.io/api/classes/client.ScheduleClient#create
  const watchUsersSchedule = await client.schedule.create({
    action: {
      type: 'startWorkflow',
      workflowType: watchUsers,
      //args: [''],
      taskQueue: 'main-queue',
    },
    scheduleId: 'watchUsers-schedule',
    policies: {
      catchupWindow: '1 day',
      overlap: ScheduleOverlapPolicy.SKIP,
    },
    spec: {
      intervals: [{ every: '5s' }]
    },
  });
  console.log(`Started schedule '${watchUsersSchedule.scheduleId}'.`);

  await client.connection.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});