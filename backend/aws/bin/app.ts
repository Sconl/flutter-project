#!/usr/bin/env node

// File: app.ts
// Author: Sconl Peter
// Email: sconl@proton.me
// Description: ENTRY POINT for the aws cdk code
// Create Date & Time: Monday 8 April 2024

import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { SecretStack } from '../lib/stacks/secret_stack';
import { UserPoolStack } from '../lib/stacks/userpool_stack';
import { IAMStack } from '../lib/stacks/iam_stack'; // make sure the path is correct

const app = new App();
const secretStack = new SecretStack(app, 'SecretStack');
const userPoolStack = new UserPoolStack(
  app,
  'UserPoolStack',
  secretStack.googleClientId,
  secretStack.googleClientSecret,
  secretStack.callbackUrl,
  secretStack.emailFrom,
  secretStack.emailReplyTo
);
new IAMStack(app, 'MyIAMStack', userPoolStack.userPool);
app.synth();
