// File: iam_stack.ts
// Author: Sconl Peter
// Email: sconl@proton.me
// Description: defining IAM roles for various aws resources
// Create Date & Time: Monday 8 April 2024

import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Role, ServicePrincipal, PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';
import * as cognito from 'aws-cdk-lib/aws-cognito'; // Add this line

export class IAMStack extends Stack {
  constructor(scope: Construct, id: string, userPool: cognito.UserPool, props?: StackProps) {
    super(scope, id, props);

    // Define an IAM role that the Lambda function will assume
    const userPoolManagementRole = new Role(this, 'userPoolManagementRole', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
    });

    // Define a policy that allows the role to perform necessary actions on the Cognito user pool
    const policy = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['cognito-idp:AdminAddUserToGroup', 'cognito-idp:AdminRemoveUserFromGroup'],
      resources: [userPool.userPoolArn], // Use the User Pool ARN from the UserPoolStack
    });

    // Attach the policy to the role
    userPoolManagementRole.addToPolicy(policy);
  }
}
