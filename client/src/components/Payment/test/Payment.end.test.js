const request = require('supertest');
const http = require('http');
const app = require('../../../../../server/index.js');
const PORT = 3002;
var server;

beforeAll( async () => {
  server = await http.createServer(app);
  server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
})

describe('Test on payment server routes', () => {
  let session_id = 1;
  let user_id = 10;

  test('should get session', async () => {
    const result = await request(server)
    .get(`/session${session_id}`)
    .catch((err) => console.log('err on GET session test', err));

    expect(result.status).toBe(200);
    expect(typeof result._body[0]).toBe('object');
    // console.log('result?', result);
    expect(result._body[0].session_code).toBe(`${session_id}`);
  });

});

afterAll( function () {
  server.close();
})