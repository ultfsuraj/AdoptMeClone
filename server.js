

import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import renderApp from "./dist/server/ServerApp.js";
// need to build this before running server.js 

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3001;

const html = fs
  .readFileSync(path.resolve(__dirname, "./dist/client/index.html"))
  .toString();

const parts = html.split("not rendered");
// split the html in parts, ( second part(app.js) contains script which is actually moved up and loaded)

const app = express();

app.use(
  "/assets",
  express.static(path.resolve(__dirname, "./dist/client/assets"))
);

// non assets resources handled by react
app.use((req, res) => {
  res.write(parts[0]);
  
  // stream we're getting from renderToPipeableStream 
  const stream = renderApp(req.url, {
    onShellReady() {
                  // response object and react stream are connected, react -> node res
          // rendering to stream, isn't good for SEO
          // if it's the crawler, do nothing here
      stream.pipe(res);
    },
    onShellError() {
      // do error handling
    },
    onAllReady() {
                  // if it is the crawler
          // stream.pipe(res), dump all at once
          
          // last thing to write. react is gonna give it to you incrementally 
      res.write(parts[1]);
      res.end();
    },
    onError(err) {
      console.error(err);
    },
  });
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);