import { generateClient } from "@aws-amplify/api";
import { lambdainvoke } from "../graphql/queries";

const client = generateClient();

export const Lambda = (props) => {
  const handleLambdaInvoke = async () => {
    try {
      const response = await client.graphql({
        query: lambdainvoke,
      });
      const message = response.data.lambdainvoke;
      alert(message);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <button onClick={handleLambdaInvoke}>メール送信</button>
    </div>
  );
};
