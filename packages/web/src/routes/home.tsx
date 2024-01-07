import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "../App.css";
import { trpc } from "../utils/trpc";

function Home() {
  const [count] = useState(0);
  const testQuery = trpc.read.useQuery("test");
  console.log(testQuery.data);

  const create = trpc.create.useMutation({
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleClick = async () => {
    const input = "Test";
    create.mutate(input);
  };
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClick}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default Home;
