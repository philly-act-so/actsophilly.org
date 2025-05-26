#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
const stackname = require("@cdk-turnkey/stackname");
import { ActsophillyOrgStack } from "../lib/actsophilly.org-stack";
import { GitHubOidcRoleStacks } from "./GitHubOIDCRoleStacks";

if (!process.env.GITHUB_REPOSITORY) {
  console.error(
    "GITHUB_REPOSITORY is not set, it should be something like douglasnaphas/aws-github-oidc"
  );
  process.exit(3);
}
if (!process.env.GITHUB_REF) {
  console.error(
    "GITHUB_REPOSITORY is not set, it should be something like refs/heads/main"
  );
  process.exit(4);
}
const app = new cdk.App();
GitHubOidcRoleStacks(app, process.env.GITHUB_REPOSITORY);
new ActsophillyOrgStack(app, stackname("actsophilly-org", { hash: 5 }), {});
