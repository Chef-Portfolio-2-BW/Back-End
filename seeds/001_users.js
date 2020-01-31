
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username:'dang', password:'$2a$14$accVLKnwabqpKesp4Jhm2.kVgT27TjW/KtvlJIzejN4lAFAA0RnVa', email: 'dang@test.com'},
        {id: 2, username:'mason', password:'$2a$14$accVLKnwabqpKesp4Jhm2.kVgT27TjW/KtvlJIzejN4lAFAA0RnVa', email: 'mason@test.com'},
        {id: 3, username:'blake', password:'$2a$14$accVLKnwabqpKesp4Jhm2.kVgT27TjW/KtvlJIzejN4lAFAA0RnVa', email: 'blake@test.com'}
      ]);
    });
};
