"use strict";
// instead of updating, we only finding, inserting and deleting (if we would like to update, we can find, update gere and reinsert the document with the new data)
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionInitializer = void 0;
const connect_1 = require("./connect");
const collectionInitializer = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = connect_1.db.collection(props.collectionName);
    yield collection.createIndexes(props.indexSpecs);
    collection.insertOneUnsafely = collection.insertOne;
    collection.insertManyUnsafely = collection.insertMany;
    collection.updateOneUnsafely = collection.updateOne;
    collection.updateManyUnsafely = collection.updateMany;
    collection.insertOne = (doc, options) => __awaiter(void 0, void 0, void 0, function* () {
        const validation = props.documentSchema.safeParse(doc);
        if (!validation.success) {
            throw new Error(JSON.stringify(validation.error));
        }
        const result = yield collection.insertOneUnsafely(doc, options);
        return result;
    });
    collection.insertMany = (docs, options) => __awaiter(void 0, void 0, void 0, function* () {
        docs.forEach(doc => {
            const validation = props.documentSchema.safeParse(doc);
            if (!validation.success) {
                throw new Error(JSON.stringify(validation.error));
            }
        });
        const result = yield collection.insertManyUnsafely(docs, options);
        return result;
    });
    collection.updateOne = (filter, update, options) => __awaiter(void 0, void 0, void 0, function* () {
        const testCollection = connect_1.db.collection(`test_${props.collectionName}`);
        yield testCollection.deleteMany({});
        const document = yield collection.findOne(filter);
        if (document) {
            yield testCollection.insertOne(document);
            testCollection.updateOne(filter, update, options);
            const updatedTestDocument = yield testCollection.findOne(filter);
            const testValidation = props.documentSchema.safeParse(updatedTestDocument);
            if (!testValidation.success) {
                throw new Error(JSON.stringify(testValidation.error));
            }
        }
        const result = yield collection.updateOneUnsafely(filter, update, options);
        return result;
    });
    collection.updateMany = (filter, update, options) => __awaiter(void 0, void 0, void 0, function* () {
        const testCollection = connect_1.db.collection(`test_${props.collectionName}`);
        yield testCollection.deleteMany({});
        const document = yield collection.findOne(filter);
        if (document) {
            yield testCollection.insertOne(document);
            testCollection.updateMany(filter, update, options);
            const updatedTestDocument = yield testCollection.findOne(filter);
            const testValidation = props.documentSchema.safeParse(updatedTestDocument);
            if (!testValidation.success) {
                throw new Error(JSON.stringify(testValidation.error));
            }
        }
        const result = yield collection.updateManyUnsafely(filter, update, options);
        return result;
    });
    return collection;
});
exports.collectionInitializer = collectionInitializer;
