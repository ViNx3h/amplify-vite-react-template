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
  const [data, setData] = useState<Array<Schema["List"]["type"]>>([]);
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [file, setFile] = React.useState<File>();
  const [state, setState] = useState<any | undefined>(undefined);
  console.log(data);



  const handleChange = (event: any) => {
    setFile(event.target.files[0]);
  };



  // useEffect(() => {
  //   // Adding error handling in case the query fails
  //   const subscription = client.models.List?.observeQuery?.().subscribe({
  //     next: (data) => setState([...data.items]),
  //     error: (error) => console.error("Error fetching data: ", error),
  //   });

  //   // Cleanup subscription when the component unmounts
  //   return () => subscription?.unsubscribe();
  // }, []);

  useEffect(() => {
    client.models.List.observeQuery().subscribe({
      next: (data) => setData([...data.items]),
    });
  }, []);

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
  const deletePath = async (id: string) => {
    try {
      const isRemove = await (
        client.models.List.delete({ id })
      )
      console.log(isRemove);
    } catch (error) {
      console.log('Error: ', error)
    }

  }


  const handleDisplay = async () => {
    try {
      const isDisplay = await list({
        path: `picture-submissions/`,

        options: {
          bucket: 'amplifyTeamDrive',
          // Specify a target bucket using name assigned in Amplify Backend
          // Alternatively, provide bucket name from console and associated region
          listAll: true,

        }

      });
      console.log('File Properties ', isDisplay);
      console.log(isDisplay);
      setState(isDisplay.items);
      console.log(state);
    } catch (error) {
      console.log('Error', error)
    }

  }

  // const handleDownload = async (path: string) => {
  //   const isDownload = await downloadData({
  //     path: path,
  //     options: {
  //       bucket: 'amplifyTeamDrive',
  //       onProgress: (progress: any) => {
  //         console.log(`Download progress: ${(progress.transferredBytes / progress.totalBytes) * 100}%`);
  //       }
  //     }
  //   }).result;
  //   console.log(isDownload);
  //   const isDisplay = await
  //     client.models.List.create({ content: path })


  //   console.log(isDisplay);
  // }


  // const handleRemove = async (path: string) => {
  //   try {
  //     const isRemove = await remove({
  //       path: path,
  //       options: {
  //         bucket: 'amplifyTeamDrive',
  //       }
  //     });
  //     console.log(isRemove);
  //   } catch (error) {
  //     console.log('Error: ', error);
  //   }

  // }


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
          <ul>
            {
              data.map((files: any) => (
                <li onClick={() => deletePath(files.id)} key={files.id}>{files.content}</li>
              ))}
          </ul>

        </main>

      )}
    </Authenticator>


  );
}

export default App;
