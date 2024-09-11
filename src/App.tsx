import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { generateClient } from "aws-amplify/data";
import { list, uploadData } from 'aws-amplify/storage';
import React, { useEffect, useState } from 'react';
import type { Schema } from "../amplify/data/resource";

const client = generateClient<Schema>();

interface File {
  name: any,
}

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [file, setFile] = React.useState<File>();

  const handleChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  const handleDisplay = async () => {
    const isDisplay = await list({
      path: `picture-submissions/*`,
      options: {
        // Specify a target bucket using name assigned in Amplify Backend
        // Alternatively, provide bucket name from console and associated region
        bucket: {
          bucketName: 'amplify-d2x7let61n8fca-ma-amplifyteamdrivebucket28-90epohn8if9i',
          region: 'ap-southeast-1'
        }
      }
    });
    console.log(isDisplay);
  }




  // const getData = async () => downloadData({
  //   path: `picture-submissions/*`,
  //   options: {
  //     // Alternatively, provide bucket name from console and associated region
  //     bucket: {
  //       bucketName: 'amplify-d2x7let61n8fca-ma-amplifyteamdrivebucket28-90epohn8if9i',
  //       region: 'ap-southeast-1'
  //     }
  //   }
  // }).result;
  return (


    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>{user?.signInDetails?.loginId}'s todos</h1>
          <button onClick={createTodo}>+ new</button>
          <ul>
            {todos.map((todo) => (
              <li onClick={() => deleteTodo(todo.id)} key={todo.id}>{todo.content}</li>
            ))}
          </ul>
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
              Review next step of this tutorial.
            </a>
          </div>
          <button onClick={signOut}>Sign out</button>
          <div>
            <input type="file" onChange={handleChange} />
            <button
              onClick={() =>
                uploadData({
                  path: `picture-submissions/${file?.name}`,
                  data: file?.name,
                })
              }
            >
              Upload
            </button>
          </div>
          <div>Bucket's files</div>
          <button onClick={handleDisplay}>getData</button>
        </main>

      )}
    </Authenticator>


  );
}

export default App;
