module.exports = {
  succeed,
  fail,
  repair,
  get,
};

function succeed(item) {
  const enhancement =
      item.enhancement == 20 ? 20 : (item.enhancement + 1 );

  return { ...item, enhancement };
}

function fail(item) {
  const newItem = {...item} ;
  if (item.enhancement < 15) newItem.durability = (newItem.durability - 5);

  return newItem                                                                                 ;
}

function repair(item) {
  return { ...item, durability: 100 };
}

function get(item) {
  return { ...item };
}
