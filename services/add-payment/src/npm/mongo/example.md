this code should be implemented as part of the project:

```
import { z } from "zod";
import { IndexDescription } from "mongodb";
import { collectionInitializer, connect } from "./index.ts";

//connect to the database
await connect("mongodb://localhost:27017", "mydb");

//initialize the collections
const paymentSchema = z.object({
    /** optional id field is needed in all collection schemas */
    _id: z.string().optional(),
    name: z.string(),
    email: z.string().email(),
  });
  
type Payment = z.infer<typeof paymentSchema>;
  
const paymentsCollectionIndexes: IndexDescription[] = [{ key: { email: 1 }, unique: true }]

export const paymentsCollection = await collectionInitializer<Payment>({
    collectionName: "payments",
    documentSchema: paymentSchema,
    indexSpecs: paymentsCollectionIndexes
});

//query the collections through the overloaded and safe methods
const payment = await paymentsCollection.findOne({ email: "jhon_doe@gmail.com" });

```