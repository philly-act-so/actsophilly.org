#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ActsophillyOrgStack } from '../lib/actsophilly.org-stack';

const app = new cdk.App();
new ActsophillyOrgStack(app, 'ActsophillyOrgStack');
