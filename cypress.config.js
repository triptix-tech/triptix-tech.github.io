import { defineConfig } from 'cypress';
import fs from 'fs';
import http from 'http';

export default defineConfig({
  e2e: {
    supportFile: false,
    setupNodeEvents(on, config) {
      let lastEmail = {}

      const getBody = (request) => {
        return new Promise((resolve) => {
          const bodyParts = [];
          let body;
          request.on('data', (chunk) => {
            bodyParts.push(chunk);
          }).on('end', () => {
            body = Buffer.concat(bodyParts).toString();
            resolve(body)
          });
        });
      }

      const requestListener = async function (req, res) {
        const json = JSON.parse(await getBody(req));
        lastEmail[json.To] = json;
        res.writeHead(200);
        res.end();
      };

      const server = http.createServer(requestListener);
      server.listen('7777', 'localhost', () => {
        console.log(`Server is running on http://localhost:7777`);
      });

      on('task', {
        async getLastEmail(userEmail) {
          return new Promise(resolve => setTimeout(() => resolve(lastEmail[userEmail] || null), 1000));
        }
      })
    }
  }
})
