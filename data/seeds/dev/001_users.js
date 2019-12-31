exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("user").insert([
        { username: "rowValue1", password: "password01" },
        { username: "rowValue2", password: "password02" },
        { username: "rowValue3", password: "password03" }
      ]);
    });
};
