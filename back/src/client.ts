import { Connection, Client } from '@temporalio/client';
import { nanoid } from 'nanoid';
import { watchUsers } from './workflows';

async function run() {
  const temporalHost = process.env.TEMPORAL_ADDRESS;
  // Connect to the default Server location
  const connection = await Connection.connect({ address: temporalHost });
  // In production, pass options to configure TLS and other settings:
  // {
  //   address: 'foo.bar.tmprl.cloud',
  //   tls: {}
  // }

  const client = new Client({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  });

  const handle = await client.workflow.start(watchUsers, {
    taskQueue: 'main-queue',
    // in practice, use a meaningful business ID, like customerId or transactionId
    workflowId: 'watch-users-task-queue-' + nanoid(),
  });
  console.log(`Started workflow ${handle.workflowId}`);

  // optional: wait for client result
  console.log(await handle.result());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
})

