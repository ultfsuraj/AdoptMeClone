import { renderToPipeableStream } from "react-dom/server"; // run application to a node stream, progressively render your app, instead of sending complete html at once. react 18 , suspense send app piece by piece
import { StaticRouter } from "react-router-dom/server"; // react router that runs on Node, navigation, doesn't have history of routes
import App from "./App";

export default function render(url, opts) {
  const stream = renderToPipeableStream(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
    opts
  );

  return stream;
}

// this approach , we can just have VITE build ServerApp.jsx
// and import what is built by VITE to Node
// So we don't have to build our entire node server, we just have to build server app 
// which then interfaces to our jsx. bcz node can't read jsx. 
// you can also use babel-node which gets janky pretty quickly 
// to enable "import" in node, add type: module in package.json