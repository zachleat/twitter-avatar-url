const test = require("ava");
const AvatarUrl = require("../");

test("Chunk usernames", t => {
  t.deepEqual([
    [1]
  ], AvatarUrl.chunkUsernames([1]));

  t.deepEqual([
    [1,2,3,4,5]
  ], AvatarUrl.chunkUsernames([1,2,3,4,5]));
  
  t.deepEqual([
    [1,2],
    [3,4],
    [5]
  ], AvatarUrl.chunkUsernames([1,2,3,4,5], 2));
});