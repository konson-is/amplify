import * as cdk from "aws-cdk-lib";
import * as AmplifyHelpers from "@aws-amplify/cli-extensibility-helper";
import { Construct } from "constructs";
import * as sns from "aws-cdk-lib/aws-sns";
import * as subs from "aws-cdk-lib/aws-sns-subscriptions";

export class cdkStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props?: cdk.StackProps,
    amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps
  ) {
    super(scope, id, props);
    new cdk.CfnParameter(this, "env", {
      type: "String",
      description: "Current Amplify CLI env name",
    });

    const amplifyProjectInfo = AmplifyHelpers.getProjectInfo();
    const snsTopicResourceNamePrefix = `sns-topic-${amplifyProjectInfo.projectName}`;
    const topic = new sns.Topic(this, "sns-topic", {
      topicName: `${snsTopicResourceNamePrefix}-${cdk.Fn.ref("env")}`,
    });
    topic.addSubscription(
      new subs.EmailSubscription("orphans.13.1672@gmail.com")
    );

    new cdk.CfnOutput(this, "snsTopicArn", {
      value: topic.topicArn,
      description: "The arn of the SNS topic",
    });
  }
}
