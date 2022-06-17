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

  test('should GET/session:session_id', async () => {
    const result = await request(server)
    .get(`/session${session_id}`)
    .catch((err) => console.log('err on GET/session:session_id test', err));

    expect(result.status).toBe(200);
    expect(typeof result._body[0]).toBe('object');
    expect(result._body[0].session_code).toBe(`${session_id}`);
  });

  test('should GET/session:session_id/users', async () => {
    const result = await request(server)
    .get(`/session${session_id}/users`)
    .catch((err) => console.log('err on GET/session:session_id/users test', err));

    expect(result.status).toBe(200);
    expect(typeof result._body[0].users).toBe('object');
    expect(result._body[0].users).toHaveProperty([`${user_id}`, 'user_id'], user_id);
  });

  test('should PUT/session:session_id/user:user_id/cart', async () => {
    let updateItem = { order_item_id: 2 };

    const result = await request(server)
    .put(`/session${session_id}/user${user_id}/cart`)
    .send(updateItem)
    .catch((err) => console.log('err on PUT/session:session_id/user:user_id/cart test', err));

    expect(result.status).toBe(200);

    const result2 = await request(server)
    .get(`/session${session_id}/users`)
    .catch((err) => console.log('err on GET/session:session_id/users test', err));

    expect(result2.status).toBe(200);
    expect(result2._body[0].users[user_id].user_cart).toContain(updateItem.order_item_id);
  });

  test('should PUT/session:session_id/user:user_id/item_paid', async () => {
    const result0 = await request(server)
    .get(`/session${session_id}/users`)
    .catch((err) => console.log('err on GET/session:session_id/users test', err));

    let user_cart = result0._body[0].users[user_id].user_cart; //[ 1, 4, 5, 8, 2 ]
    // console.log('current?', user_cart);

    const result = await request(server)
    .put(`/session${session_id}/user${user_id}/item_paid`)
    .catch((err) => console.log('err on PUT/session:session_id/user:user_id/item_paid test', err));

    expect(result.status).toBe(200);

    const result2 = await request(server)
    .get(`/session${session_id}`)
    .catch((err) => console.log('err on GET/session:session_id test', err));

    expect(result2.status).toBe(200);
    // console.log('result2', result2._body[0].group_cart);
    let group_cart = result2._body[0].group_cart;
    expect(group_cart[user_cart[0]]['paid?']).toBe(true);
  });

  test('should DELETE/session:session_id/user:user_id/cart', async () => {
    let deleteItem = { order_item_id: 2 };

    const result = await request(server)
    .delete(`/session${session_id}/user${user_id}/cart`)
    .send(deleteItem)
    .catch((err) => console.log('err on DELETE/session:session_id/user:user_id/cart test', err));

    expect(result.status).toBe(200);

    const result2 = await request(server)
    .get(`/session${session_id}/users`)
    .catch((err) => console.log('err on GET/session:session_id/users test', err));

    expect(result2.status).toBe(200);
    expect(result2._body[0].users[user_id].user_cart).not.toContain(deleteItem.order_item_id);
  });

  test('should GET/session:session_id/userInfo', async () => {
    const result = await request(server)
    .get(`/session${session_id}/userInfo`)
    .catch((err) => console.log('err on GET/session:session_id/userInfo test', err));

    expect(result.status).toBe(200);
    expect(typeof result._body[0]).toBe('object');
    expect(result._body[0].user_id).toBe(user_id);
  });

  test('should PUT/session:session_id/user:user_id/pay', async () => {
    const result = await request(server)
    .put(`/session${session_id}/user${user_id}/pay`)
    .catch((err) => console.log('err on PUT/session:session_id/user:user_id/pay test', err));

    expect(result.status).toBe(200);

    const result2 = await request(server)
    .get(`/session${session_id}/users`)
    .catch((err) => console.log('err on GET/session:session_id/users test', err));

    expect(result2.status).toBe(200);
    // console.log('result2?', result2._body[0]);
    expect(result2._body[0].users[user_id]['checkout?']).toBe(true);
  });

  test('should PUT/session:session_id/user:user_id/receipt', async () => {
    let data = {
      'session_id': session_id,
      ' user_id': user_id,
      userCart: [ 4, 5 ],
      userTip: 100,
      userTotal: 200
    };

    const result = await request(server)
    .put(`/session${session_id}/user${user_id}/receipt`)
    .send(data)
    .catch((err) => console.log('err on PUT/session:session_id/user:user_id/receipt test', err));

    expect(result.status).toBe(200);

    const result2 = await request(server)
    .get(`/session${session_id}`)
    .catch((err) => console.log('err on GET/session:session_id test', err));

    expect(result2.status).toBe(200);
    let receipt = result2._body[0].receipt[user_id];
    expect(receipt.items).toContain(data.userCart[0]);
    expect(receipt.user_tip).toEqual(data.userTip);
    expect(receipt.total_paid).toEqual(data.userTotal);
  });

  test('should PUT/session:session_id/updateOrderPaid', async () => {
    const result = await request(server)
    .put(`/session${session_id}/updateOrderPaid`)
    .catch((err) => console.log('err on PUT/session:session_id/updateOrderPaid test', err));

    expect(result.status).toBe(200);

    const result2 = await request(server)
    .get(`/session${session_id}`)
    .catch((err) => console.log('err on GET/session:session_id test', err));

    expect(result2.status).toBe(200);
    expect(result2._body[0]['order_paid?']).toBe(true);
    expect(typeof result2._body[0]['date']).toBe('string');
  });

  test('should PUT/session:session_id/updateTotalTipAndTotalPaid', async () => {
    let total = { update_tip: 100, update_total_paid: 200 };

    // before the update
    const result0 = await request(server)
    .get(`/session${session_id}`)
    .catch((err) => console.log('err on GET/session:session_id test', err));

    expect(result0.status).toBe(200);
    let old_total_tip = result0._body[0].total_tip;
    let old_total_paid = result0.body[0].total_paid
    // console.log('old', old_total_tip, old_total_paid)

    // run the update
    const result = await request(server)
    .put(`/session${session_id}/updateTotalTipAndTotalPaid`)
    .send(total)
    .catch((err) => console.log('err on PUT/session:session_id/updateTotalTipAndTotalPaid test', err));

    expect(result.status).toBe(200);

    // after the update
    const result2 = await request(server)
    .get(`/session${session_id}`)
    .catch((err) => console.log('err on GET/session:session_id test', err));

    expect(result2.status).toBe(200);
    expect(result2._body[0]['total_tip']).toEqual(old_total_tip + total.update_tip);
    expect(result2._body[0]['total_paid']).toEqual(old_total_paid + total.update_total_paid);
  });
});

afterAll( function () {
  server.close();
})