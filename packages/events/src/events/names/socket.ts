export const socketEventsNames = {
  USER_CONNECTED: 'USER_CONNECTED',
  USER_DISCONNECTED: 'USER_DISCONNECTED',
} as const;

/**
 * socket service responsibilities:
 * there are only two responsibilities for the socket service:
 * 1. the main responsibility is anable our system to approach the users in real time
 * 2. publish event whenever users connect / disconnect in case any other service needs to know about it
 * basic rules:
 * a. the user can send approach our system esally by http requests, that means we will almost never listen to the user's events, only the other way around
 *      * the only exception is in case we will need a super fast way to receive data from the user or allot of requests (and the we can use sockets to avoid the http handshakes)
 * b. so the main functionality of the socket service is to listen to the events from the other services and push them to the users,
 *    on the other hand some event contains a data that must not get to the user, קיצר לא להשתמש במשהו אוטומטי אלא כל ליסטנר צריך לציין ספציפית שהוא מקשיב לאירוע מסויים
 *
 *
 */
