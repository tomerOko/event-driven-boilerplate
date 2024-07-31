import { ErrorHandlerParams, db, errorHandler, functionWrapper, headerNames } from 'common-lib-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';


import { appErrorCodes } from './appErrorCodes';
import * as service from './service';
import z from 'zod';

class PubSub{
    on(event: string, callback: (data: any) => any){
        //...
    }
    emit(event: string, data: any){
        //...
    }
}
const pubSub = new PubSub();

/** pre-order subscribers */ 
pubSub.on('new-item', (data) => {
    db.collection('items').insertOne(data);
})

pubSub.on('item-updated', (data) => {
    db.collection('items').updateOne(data.itemId, data);
})

pubSub.on('item-deleted', (data) => {
    db.collection('items').deleteOne(data);
})

pubSub.on('new-user', (data) => {
    db.collection('users').insertOne(data);
})

pubSub.on('user-updated', (data) => {
    db.collection('users').updateOne(data.userId, data);
})

pubSub.on('user-deleted', (data) => {
    db.collection('users').deleteOne(data);
})


/**validation */
export const listedItemValidation = z.object({
    itemId: z.string(),
    quantity: z.number(),
  });
  
export const newOrderValidation = z.object({
  body: z.object({
    items: z.array(listedItemValidation),
    addressId: z.string(),
    paymentMethodId: z.string(),
  }),
});

export type NewOrderRequest = z.infer<typeof newOrderValidation>;


/**router */
router.post('new-order', validateRequest(validations.newOrderValidation, controller.newOrder);)


/**controller */
export const newOrder = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const user = await findUserByToken(req.headers[headerNames.accessToken]);
      const order: NewOrderRequest['body'] = req.body;
      await service.newOrder(user, order);
    } catch (error) {
      const handlerProps: ErrorHandlerParams = {};
      handlerProps[appErrorCodes.INVALID_TOKEN] = [httpStatus.CONFLICT, 'the access token is invalid, user should sign in again'];
      handlerProps[appErrorCodes.USER_NOT_FOUND] = [httpStatus.CONFLICT, 'this user is no longer in the system'];
      errorHandler(handlerProps)(error, next);
    }
  });
};


/**service */
export const newOrder = async (user: User, order: NewOrderRequest['body']) => {
    const { orderItemDetails, totalPrice } = await parseOrderItems(order);
    const insertResult = await db.collection('orders').insertOne({ ...order, userId: user._id, items: orderItemDetails });
    const orderId = insertResult.insertedId;
    pubSub.emit('charge-user', { userId: user._id, amount: totalPrice, orderId, paymentMethodId: order.paymentMethodId });
}

const parseOrderItems = async (order:  NewOrderRequest['body']) => {
    const itemsIds = order.items.map((item) => item.itemId);
    const savedItems = await db.collection('items').find({ _id: { $in: itemsIds } }).toArray();
    const orderItemDetails = savedItems.map((item) => {
        item.quantity = order.items.find((orderItem) => orderItem.itemId === item.id)?.quantity;
        return item;
    });
    const totalPrice = orderItemDetails.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return { orderItemDetails, totalPrice };
}

/** post-order subscribers */
pubSub.on('successful-charging', (data) => { 
    const { orderId } = data;
    const order = db.collection('orders').findOne({ _id: orderId });
    pubSub.emit('send-socket-message', { userId: data.userId, payload: {orderId, status:'payment-approved'} });
    pubSub.emit('ship-order', { order });
    const invoice = templates.generateInvoice(order);
    pubSub.emit('send-email', { userId: data.userId, subject: 'Invoice', body: invoice });
})

pubSub.on('shipping-location-updated', (data) => { 
    //notify user
    //update order in db
})


pubSub.on('failed-charging', (data) => { 
    //notify user
    //update order in db
})

pubSub.on('failed-shipping', (data) => { 
    //notify user
    //update order in db
    //return items to stock
    //issue refund
})

pubSub.on('successful-shipping', (data) => { //data = {order}
    //update order in db
})





