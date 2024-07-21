export const socketEventsNames = {
  /**
   * published with socketID
   * subscribed by meet service to send other user's that want to call the user.
   * subscribed by chat service to mark the user as online
   * subscribed by search service to mark the user as 'available for call' (if the user is a teacher, not in a meeting, and set 'available now' in the profile)
   */
  USER_CONNECTED: 'USER_CONNECTED',
  /**
   * subscribed by the same services as 'USER_CONNECTED' just to do the opposite
   */
  USER_DISCONNECTED: 'USER_DISCONNECTED',
} as const;

/**
 * socket service responsibilities:
 * there are only two responsibilities for the socket service:
 * 1. the main responsibility is anable our system to approach the users in real time (so other services publish events to the socket service and the socket service push them to the users)
 * 2. publish event whenever users connect / disconnect in case any other service needs to know about it
 * basic rules:
 * a. the user can send approach our system esally by http requests, that means we will almost never listen to the user's events, only the other way around
 *      * the only exception is in case we will need a super fast way to receive data from the user or allot of requests (and the we can use sockets to avoid the http handshakes)
 * b. so the main functionality of the socket service is to listen to the events from the other services and push them to the users,
 *    on the other hand some event contains a data that must not get to the user, קיצר לא להשתמש במשהו אוטומטי אלא כל ליסטנר צריך לציין ספציפית שהוא מקשיב לאירוע מסויים
 *
 *
 */
