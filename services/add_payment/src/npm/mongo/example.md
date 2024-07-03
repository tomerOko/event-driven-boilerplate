this code should be implemented as part of the project:

```
import { z } from "zod";
import { IndexDescription } from "mongodb";
import { collectionInitializer, connect } from "./index.ts";

//connect to the database
await connect("mongodb://localhost:27017", "mydb");

//initialize the collections
const userSchema = z.object({
    /** optional id field is needed in all collection schemas */
    _id: z.string().optional(),
    name: z.string(),
    email: z.string().email(),
  });
  
type User = z.infer<typeof userSchema>;
  
const usersCollectionIndexes: IndexDescription[] = [{ key: { email: 1 }, unique: true }]

export const usersCollection = await collectionInitializer<User>({
    collectionName: "users",
    documentSchema: userSchema,
    indexSpecs: usersCollectionIndexes
});

//query the collections through the overloaded and safe methods
const user = await usersCollection.findOne({ email: "jhon_doe@gmail.com" });

```