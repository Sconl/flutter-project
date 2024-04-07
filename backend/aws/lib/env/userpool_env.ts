// File: userpool_env.ts
// Author: Sconl Peter
// Email: sconl@proton.me
// Description: ENVIRONMENT VARIABLES for userpool_stack.ts
// Create Date & Time: Monday 8 April 2024

import * as projectEnv from './project_env';

// Define environment variables for the User Pool configuration
export const USER_POOL_ID = `${projectEnv.PROJECT_NAME}_userpool_id`;
export const USER_POOL_ARN = `${projectEnv.PROJECT_NAME}_userpool_arn`;
export const USER_POOL_NAME = `${projectEnv.PROJECT_NAME}_users`;
export const GOOGLE_CLIENT_ID = `${projectEnv.PROJECT_NAME}GoogleClient`;
export const VERIFICATION_SUBJECT = `${projectEnv.PROJECT_NAME} Email Verification`;
export const VERIFICATION_MESSAGE_BODY = `Your ${projectEnv.PROJECT_NAME} verification code is {####}`;
export const VERIFICATION_SMS_MESSAGE = `Your ${projectEnv.PROJECT_NAME} verification code is {####}`;
export const USER_GROUP_NAMES = projectEnv.USER_GROUP_NAMES;
export const USER_TIERS = projectEnv.USER_TIERS;
