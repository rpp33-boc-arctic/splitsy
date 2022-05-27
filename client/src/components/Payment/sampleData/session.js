module.exports = {
  'session_code': 1,
  'restaurant': {
    'restaurant_id': 2,
    'name': "Mcdonald's",
    'address': "24710 North Lake Pleasant Parkway",
  },
  'order_id': "03001",
  'users': [
    {
      'user_id': 10,
      'checkout?': true,
      'user_cart': [ 1, 4, 5, 8 ] // [ order_item_id ]
    },
    {
      'user_id': 100,
      'checkout?': true,
      'user_cart': [ 2, 3, 7 ] // [ order_item_id ]
    },
    {
      'user_id': 120,
      'checkout?': true,
      'user_cart': [ 6 ] // [ order_item_id ]
    }
  ],
  'group_cart': [
    {
      'order_item_id': 1,
      'menu_item_id': 40,
      'menu_item_name': "New! Wildberry Lemonade Splasher",
      'menu_item_description': "A blend of lemonade, lemon-lime soda & wildberry syrup. Topped with fresh blueberries.",
      'menu_item_photo': "https://cdn-img.mealme.ai/90e9d98020a85e8638fd285f35c2bc1abfb8549a/68747470733a2f2f74622d7374617469632e756265722e636f6d2f70726f642f696d6167652d70726f632f70726f6365737365645f696d616765732f39333033653532343161613362323430393735313462633865376430313139662f38353962616666316437363034326134356533313964316465383061656337612e6a706567",
      'menu_item_price': 480,
      'user_id': 10,
      'username': 'Bob Builder',
      'paid?': true
    },
    {
      'order_item_id': 2,
      'menu_item_id': 41,
      'menu_item_name': "Belgian Waffle Combo",
      'menu_item_description': "Our house-made golden-brown Belgian waffle is served with 2 eggs* your way and 2 custom-cured hickory-smoked bacon strips or 2 pork sausage links.",
      'menu_item_photo': "https://cdn-img.mealme.ai/c527034d6b9a17bd2abd42abbd6707b158b2ce57/68747470733a2f2f643172616c736f676e6a6e6733372e636c6f756466726f6e742e6e65742f37343830343631342d643530622d343635622d616237622d3932646137323337373161642e6a706567",
      'menu_item_price': 1390,
      'user_id': 100,
      'username': 'Bob Handy',
      'paid?': true
    },
    {
      'order_item_id': 3,
      'menu_item_id': 42,
      'menu_item_name': "New! Wildberry Lemonade Splasher",
      'menu_item_description': "A blend of lemonade, lemon-lime soda & wildberry syrup. Topped with fresh blueberries.",
      'menu_item_photo': "https://cdn-img.mealme.ai/90e9d98020a85e8638fd285f35c2bc1abfb8549a/68747470733a2f2f74622d7374617469632e756265722e636f6d2f70726f642f696d6167652d70726f632f70726f6365737365645f696d616765732f39333033653532343161613362323430393735313462633865376430313139662f38353962616666316437363034326134356533313964316465383061656337612e6a706567",
      'menu_item_price': 480,
      'user_id': 100,
      'username': 'Bob Handy',
      'paid?': true
    },
    {
      'order_item_id': 4,
      'menu_item_id': 43,
      'menu_item_name': "House-Made Milkshakes",
      'menu_item_description': "Shake it to the next level with hand-scooped premium ice cream, vanilla, real milk and whipped topping.",
      'menu_item_photo': "https://cdn-img.mealme.ai/b7881b6efd88773401725a42171e6c81d6c05623/68747470733a2f2f74622d7374617469632e756265722e636f6d2f70726f642f696d6167652d70726f632f70726f6365737365645f696d616765732f32626166663331353033383735633538363565626335383332653531646533612f38353962616666316437363034326134356533313964316465383061656337612e6a706567",
      'menu_item_price': 700,
      'user_id': 10,
      'username': 'Bob Builder',
      'paid?': true
    },
    {
      'order_item_id': 5,
      'menu_item_id': 44,
      'menu_item_name': "Mega Monster Cheeseburger",
      'menu_item_description': "No need to fear this monster. Two all-natural black angus steakburger patties, American cheese, lettuce, tomato, red onion, pickles & IHOP® Sauce. Chicken options not available.",
      'menu_item_photo': "https://cdn-img.mealme.ai/0ac40462e5c31fe858c904c88accdb3846665ade/68747470733a2f2f6d656469612d63646e2e677275626875622e636f6d2f696d6167652f75706c6f61642f685f302e32352f707275387571776c6e736a736e74396f696c71682e6a7067",
      'menu_item_price': 1850,
      'user_id': 10,
      'username': 'Bob Builder',
      'paid?': true
    },
    {
      'order_item_id': 6,
      'menu_item_id': 45,
      'menu_item_name': "Jalapeño Kick",
      'menu_item_description': "This one will kick you back. Spicy blend of sautéed jalapeños, Serranos & onion, bacon, Pepper Jack cheese, lettuce, tomato & mayo.",
      'menu_item_photo': "https://cdn-img.mealme.ai/99d04aa7f7e8b5e5a76c37d450b6907510eb41c9/68747470733a2f2f6d656469612d63646e2e677275626875622e636f6d2f696d6167652f75706c6f61642f685f302e32352f6d7563346d376d6a347171306f676c7268396b682e6a7067",
      'menu_item_price': 1650,
      'user_id': 120,
      'username': 'Bob Ross',
      'paid?': true
    },
    {
      'order_item_id': 7,
      'menu_item_id': 46,
      'menu_item_name': "Sharp Cheddar Mac & Cheese",
      'menu_item_description': "A blend of lemonade, lemon-lime soda & wildberry syrup. Topped with fresh blueberries.",
      'menu_item_photo': "https://cdn-img.mealme.ai/df6ca018bd98443a551ababd99f8caede32970c7/68747470733a2f2f6d656469612d63646e2e677275626875622e636f6d2f696d6167652f75706c6f61642f685f302e32352f6b39707a3878766f706f797532613963336566762e6a7067",
      'menu_item_price': 510,
      'user_id': 100,
      'username': 'Bob Handy',
      'paid?': true
    },
    {
      'order_item_id': 8,
      'menu_item_id': 46,
      'menu_item_name': "Hickory-Smoked Bacon Strips",
      'menu_item_description': "A blend of lemonade, lemon-lime soda & wildberry syrup. Topped with fresh blueberries.",
      'menu_item_photo': "https://cdn-img.mealme.ai/be6d937bd04fa7c62786aa2d5903ab4ed9286c22/68747470733a2f2f6d656469612d63646e2e677275626875622e636f6d2f696d6167652f75706c6f61642f685f302e32352f6a6f316b7a646f70716b68686a6f6630657566742e6a7067",
      'menu_item_price': 510,
      'user_id': 10,
      'username': 'Bob Builder',
      'paid?': true
    }
  ],
  // 'receipt': {  // proposing this structure.
  //   '10': { // user_id
  //     'user_id': 10,
  //     'items': [ 1, 4, 5, 8 ], // [ order_item_id ]
  //     'user_tip': 20,
  //     'total_paid': 500
  //   },
  //   '100': { // user_id
  //     'user_id': 100,
  //     'items': [ 2, 3, 7, 6 ], // [ order_item_id ]
  //     'user_tip': 25,
  //     'total_paid': 600
  //   }
  // },
  'receipt': [
    {
      'user_id': 10,
      'items': [ 1, 4, 5, 8 ], // [ order_item_id ]
      'user_tip': 20,
      'total_paid': 500
    },
    {
      'user_id': 100,
      'items': [ 2, 3, 7, 6 ], // [ order_item_id ]
      'user_tip': 25,
      'total_paid': 600
    }
  ],
  'total_tip': 200,
  'total_tax': 107,
  'total_paid': 10000,
  'grand_total': 10000,
  'total_owed': 10307,
  'order_paid?': true
}