// File: userpool_stack.ts
// Author: Sconl Peter
// Email: sconl@proton.me
// Description: creating a USERPOOL for the aws project
// Create Date & Time: Monday 8 April 2024

import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import * as env from '../env/userpool_env';
import * as cdk from 'aws-cdk-lib';

export class UserPoolStack extends Stack {
  // Add a public property for the User Pool
  public readonly userPool: cognito.UserPool;

  constructor(
    scope: Construct,
    id: string,
    googleClientId: cdk.SecretValue,
    googleClientSecret: cdk.SecretValue,
    callbackUrl: string,
    emailFrom: string,
    emailReplyTo: string,
    props?: StackProps
  ) {
    super(scope, id, props);

    // Create a user pool and assign it to the userPool property
    this.userPool = new cognito.UserPool(this, 'UserPool', {
      userPoolName: env.USER_POOL_NAME,
      selfSignUpEnabled: true,
      mfa: cognito.Mfa.REQUIRED,
      mfaSecondFactor: {
        sms: true,
        otp: true
      },
      signInAliases: {
        email: true,
        phone: true
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
        fullname: {
          required: true,
          mutable: true,
        },
      },
      customAttributes: {
        'tier': new cognito.StringAttribute({ mutable: true }),
      },
      passwordPolicy: {
        minLength: 8,
        requireSymbols: true,
        requireUppercase: true,
        requireLowercase: true,
        requireDigits: true,
        tempPasswordValidity: Duration.days(7)
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      deviceTracking: { 
        deviceOnlyRememberedOnUserPrompt: true,
        challengeRequiredOnNewDevice: false
      },
      autoVerify: { email: true },
      userVerification: {
        emailSubject: env.VERIFICATION_SUBJECT,
        emailBody: env.VERIFICATION_MESSAGE_BODY,
        emailStyle: cognito.VerificationEmailStyle.CODE,
        smsMessage: env.VERIFICATION_SMS_MESSAGE,
      },
    });

    // Create user groups
    env.USER_GROUP_NAMES.forEach(groupName => {
      new cognito.CfnUserPoolGroup(this, groupName, {
        userPoolId: this.userPool.userPoolId,
        groupName: groupName,
      });
    });

    // Create a single user pool client
    const userPoolClient = new cognito.UserPoolClient(this, 'UserPoolClient', {
      userPool: this.userPool,
      authFlows: {
        userSrp: true,
        userPassword: true,
      },
      oAuth: {
        flows: {
          implicitCodeGrant: true,
        },
        scopes: [cognito.OAuthScope.OPENID],
        callbackUrls: [callbackUrl],
      },
      supportedIdentityProviders: [cognito.UserPoolClientIdentityProvider.COGNITO, cognito.UserPoolClientIdentityProvider.GOOGLE],
    });

    // Set up the Google provider
    const googleProvider = new cognito.UserPoolIdentityProviderGoogle(this, 'UserPoolIdpGoogle', {
      clientId: googleClientId.unsafeUnwrap(),
      clientSecret: googleClientSecret.unsafeUnwrap(),
      userPool: this.userPool,
      attributeMapping: {
        email: cognito.ProviderAttribute.GOOGLE_EMAIL,
        givenName: cognito.ProviderAttribute.GOOGLE_GIVEN_NAME,
        familyName: cognito.ProviderAttribute.GOOGLE_FAMILY_NAME,
        phoneNumber: cognito.ProviderAttribute.GOOGLE_PHONE_NUMBERS,
        // Additional attributes
        gender: cognito.ProviderAttribute.GOOGLE_GENDER,
        profilePicture: cognito.ProviderAttribute.GOOGLE_PICTURE,
        preferredUsername: cognito.ProviderAttribute.GOOGLE_NAME,
      },
    });

    // Create a Lambda function for adding a user
    const addUserLambda = new Function(this, 'AddUserFunction', {
      runtime: Runtime.PYTHON_3_8,
      code: Code.fromAsset('lib/lambda'),
      handler: 'add_User.handler',
    });
  }
}
