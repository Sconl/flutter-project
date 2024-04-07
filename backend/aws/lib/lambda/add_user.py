# File: add_user.py
# Author: Sconl Peter
# Email: sconl@proton.me
# Description: a lambda function to add users to a group
# Create Date & Time: Monday 8 April 2024

import json
import boto3

def handler(event, context):
  # Create a Cognito client
  cognito = boto3.client('cognito-idp')

  # Extract user data from the event
  user_data = json.loads(event['body'])

  # Add the user to the group
  response = cognito.admin_add_user_to_group(
    UserPoolId=user_data['userPoolId'],
    Username=user_data['username'],
    GroupName=user_data['groupName']
  )

  # Return a success message
  return {
    'statusCode': 200,
    'body': json.dumps('User added successfully')
  }
