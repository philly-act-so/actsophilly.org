import { App } from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import { GitHubOidcRoleStack } from "aws-github-oidc-role";
export const GitHubOidcRoleStacks = (app: App, repository: string) => {
  const policyStatements = [
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        "cloudformation:CreateChangeSet",
        "cloudformation:DeleteChangeSet",
        "cloudformation:DescribeChangeSet",
        "cloudformation:DescribeStackEvents",
        "cloudformation:DescribeStacks",
        "cloudformation:ExecuteChangeSet",
        "cloudformation:GetTemplate",
        "ssm:GetParameter",
        "ssm:GetParameters",
        "ssm:PutParameter",
        "sts:AssumeRole",
      ],
      resources: ["*"],
    }),
  ];
  const CHARACTERS_PROHIBITED_IN_CLOUDFORMATION_STACK_NAMES = /[^a-zA-Z0-9-]/g;
  const stacknamePrefix = `github-role-${repository.replaceAll(
    CHARACTERS_PROHIBITED_IN_CLOUDFORMATION_STACK_NAMES,
    "-"
  )}`;
  new GitHubOidcRoleStack(app, stacknamePrefix + `-main`, {
    ref: "refs/heads/main",
    repository,
    managedPolicyList: [],
    policyStatements,
    roleName:
      `github-actions` + `@${repository.split("/").slice(-1)}` + `@main`,
  });
  new GitHubOidcRoleStack(app, stacknamePrefix + `-all-branches`, {
    ref: "*",
    repository,
    managedPolicyList: [],
    policyStatements,
    roleName: `github-actions` + `@${repository.split("/").slice(-1)}`,
  });
};
