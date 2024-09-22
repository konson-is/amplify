import { generateClient } from "@aws-amplify/api";
import { useEffect, useState } from "react";
import { createTodo } from "../graphql/mutations";
import { listTodos } from "../graphql/queries";
import { uploadData } from "aws-amplify/storage";
import { S3 } from "./S3";

const client = generateClient();

export const DynamoDb = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await client.graphql({
        query: listTodos,
      });
      const todosData = response.data.listTodos.items;
      console.log("response:", response);
      setTodos(todosData);
    } catch (error) {
      console.log("error fetching books...", error);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDesctriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const stored = await uploadData({
        key: `public/${image.name}`,
        data: image,
        options: {
          contentType: image.type,
        },
      }).result;
      console.log("stored:", stored);

      const todoDetails = {
        title,
        description,
        image: stored.key,
      };

      const newTodo = await client.graphql({
        query: createTodo,
        variables: { input: todoDetails },
        authMode: "userPool",
      });
      console.log("投稿しました", newTodo);
      alert("投稿に成功しました");
      fetchTodos();
    } catch (error) {
      console.error("投稿に失敗しました。", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={handleDesctriptionChange}
          />
        </label>
        <br />
        <label>
          Image:
          <input type="file" onChange={handleImageChange} />
        </label>
        <button type="submit">Create Post</button>
      </form>
      <ol>
        {todos.map((todo) => (
          <li key={todo.id}>
            <S3
              title={todo.title}
              description={todo.description}
              image={todo.image}
            />
          </li>
        ))}
      </ol>
    </div>
  );
};
