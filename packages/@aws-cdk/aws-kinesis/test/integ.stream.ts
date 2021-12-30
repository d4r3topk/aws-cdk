import * as iam from '@aws-cdk/aws-iam';
import { App, Stack } from '@aws-cdk/core';
import { Stream, StreamMode } from '../lib';

const app = new App();
const stack = new Stack(app, 'integ-kinesis-stream');

const role = new iam.Role(stack, 'UserRole', {
  assumedBy: new iam.AccountRootPrincipal(),
});

const stream1 = new Stream(stack, 'onDemandStream', {
  streamMode: StreamMode.ON_DEMAND,
});

const stream2 = new Stream(stack, 'provisionedStream', {
  streamMode: StreamMode.PROVISIONED,
});

stream1.grantReadWrite(role);
stream2.grantReadWrite(role);
