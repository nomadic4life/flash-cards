const bcrypt = require("bcrypt");
const saltRounds = 10;
const hashPass = bcrypt.hashSync("TestPass", saltRounds);

const users = [
  {
    id: 0,
    username: "testuser",
    password: hashPass
  },
  {
    id: 1,
    username: "testuser1",
    password: hashPass
  },
  {
    id: 2,
    username: "testuser2",
    password: hashPass
  },
  {
    id: 3,
    username: "testuser3",
    password: hashPass
  },
  {
    id: 4,
    username: "testuser4",
    password: hashPass
  },
  {
    id: 5,
    username: "testuser5",
    password: hashPass
  },
  {
    id: 6,
    username: "testuser6",
    password: hashPass
  },
  {
    id: 7,
    username: "testuser7",
    password: hashPass
  },
  {
    id: 8,
    username: "testuser8",
    password: hashPass
  },
  {
    id: 9,
    username: "testuser9",
    password: hashPass
  },
  {
    id: 10,
    username: "testuser10",
    password: hashPass
  },
  {
    id: 11,
    username: "testuser11",
    password: hashPass
  },
  {
    id: 12,
    username: "testuser12",
    password: hashPass
  },
  {
    id: 13,
    username: "testuser13",
    password: hashPass
  },
  {
    id: 14,
    username: "testuser14",
    password: hashPass
  },
  {
    id: 15,
    username: "testuser15",
    password: hashPass
  },
  {
    id: 16,
    username: "testuser16",
    password: hashPass
  },
  {
    id: 17,
    username: "testuser17",
    password: hashPass
  },
  {
    id: 18,
    username: "testuser18",
    password: hashPass
  },
  {
    id: 19,
    username: "testuser19",
    password: hashPass
  },
  {
    id: 20,
    username: "testuser20",
    password: hashPass
  },
  {
    id: 21,
    username: "testuser21",
    password: hashPass
  },
  {
    id: 22,
    username: "testuser22",
    password: hashPass
  },
  {
    id: 23,
    username: "testuser23",
    password: hashPass
  },
  {
    id: 24,
    username: "testuse24",
    password: hashPass
  },
  {
    id: 25,
    username: "testuser25",
    password: hashPass
  }
];

module.exports = {
  users
};
