import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export class ActsophillyOrgStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Add API Gateway with a regional endpoint
    const api = new apigateway.RestApi(this, 'ActsophillyOrgApi', {
      restApiName: 'ActsophillyOrgApi',
      description: 'API Gateway for redirecting to Philly ACT-SO site',
      endpointConfiguration: {
        types: [apigateway.EndpointType.REGIONAL],
      },
    });

    // Define a method for the root path "/"
    api.root.addMethod(
      'GET',
      new apigateway.MockIntegration({
        integrationResponses: [
          {
            statusCode: '301',
            responseParameters: {
              'method.response.header.Location': `'https://sites.google.com/view/philly-act-so'`,
            },
          },
        ],
        requestTemplates: {
          'application/json': '{"statusCode": 301}',
        },
      }),
      {
        methodResponses: [
          {
            statusCode: '301',
            responseParameters: {
              'method.response.header.Location': true,
            },
          },
        ],
      }
    );

    // Add a CloudFormation output for the API Gateway endpoint
    new CfnOutput(this, 'ApiGatewayUrl', {
      value: api.url,
      description: 'The URL of the API Gateway endpoint',
    });
  }
}
