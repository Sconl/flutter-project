// File: secret_stack.ts
// Author: Sconl Peter
// Email: sconl@proton.me
// Description: accessing and supplying SECRETS from aws
// Create Date & Time: Monday 8 April 2024

import * as cdk from 'aws-cdk-lib';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import * as projectEnv from '../env/project_env';

export class SecretStack extends cdk.Stack {
  // Define the properties that will hold the parameter values
  public readonly googleClientId: cdk.SecretValue;
  public readonly googleClientSecret: cdk.SecretValue;
  public readonly callbackUrl: string;
  public readonly emailFrom: string;
  public readonly emailReplyTo: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Fetch the Google client ID and client secret from AWS Secrets Manager
    this.googleClientId = secretsmanager.Secret.fromSecretNameV2(this, 'GoogleClientId', `${projectEnv.PROJECT_NAME}_google_client_id`).secretValue;
    this.googleClientSecret = secretsmanager.Secret.fromSecretNameV2(this, 'GoogleClientSecret', `${projectEnv.PROJECT_NAME}_google_client_secret`).secretValue;

    // Fetch the other parameter values from AWS SSM Parameter Store
    this.callbackUrl = ssm.StringParameter.valueForStringParameter(this, `${projectEnv.PROJECT_NAME}_callback_url`);
    this.emailFrom = ssm.StringParameter.valueForStringParameter(this, `${projectEnv.PROJECT_NAME}_email_from`);
    this.emailReplyTo = ssm.StringParameter.valueForStringParameter(this, `${projectEnv.PROJECT_NAME}_email_reply_to`);
  }
}
