import { getUrl } from "aws-amplify/storage";
import { useEffect, useState } from "react";

export const S3 = (props) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const result = await getUrl({
          path: props.image,
        });
        console.log("result:", result.url.toString());
        setImageUrl(result.url);
      } catch (error) {
        console.log("Error fetching image:", error);
      }
    };
    fetchImageUrl();
  }, [props.image]);

  return (
    <>
      <p>title={props.title}</p>
      <p>description={props.description}</p>
      {props.image && <img src={imageUrl} alt={props.title} />}
    </>
  );
};
