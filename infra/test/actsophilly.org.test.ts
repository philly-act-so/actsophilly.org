import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as ActsophillyOrg from '../lib/actsophilly.org-stack';

test('SQS Queue and SNS Topic Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new ActsophillyOrg.ActsophillyOrgStack(app, 'MyTestStack');
  // THEN

  const template = Template.fromStack(stack);

});
