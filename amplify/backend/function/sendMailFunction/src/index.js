const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const sns = new SNSClient({ region: "ap-northeast-1" });

exports.handler = async (event) => {
  const params = {
    Message: "Amplifyのテストメールです",
    Subject: "Amplify テスト",
    TopicArn: process.env.SNSTOPICARN,
  };

  try {
    const command = new PublishCommand(params);
    await sns.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify("メールの送信が成功しました。"),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify("メールの送信に失敗しました"),
    };
  }
};
