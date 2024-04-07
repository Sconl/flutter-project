// File: project_env.ts
// Author: Sconl Peter
// Email: sconl@proton.me
// Description: reusable project information for the AWS STACKS
// Create Date & Time: Wednesday 3rd April 2024

import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

// Project Settings
export const PROJECT_NAME = 'darehustle';
export const PROJECT_DESCRIPTION = 'A platform for creators';
// Account Settings
export const USER_GROUP_NAMES = ['Admin', 'Reader', 'Creator', 'Business', 'Guest'];
export const USER_TIERS = ['Free', 'Premium', 'Pro'];

class ProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ... other project-specific variables
  }
}

const app = new cdk.App();
new ProjectStack(app, 'ProjectStack');
app.synth();
