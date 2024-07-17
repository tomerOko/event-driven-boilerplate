export const chatEventsNames = {
  /** subscribed by socket service to push the payload to the receiving user */
  USER_SENT_NEW_MESSAGE: 'MESSAGE_SENT',
  /** same as 'USER_SENT_NEW_MESSAGE' */
  USER_UPDATED_MESSAGE: 'USER_UPDATED_MESSAGE',
  /** subscribed by socket service to push the payload to the sending user (like whatsapp double v) */
  USER_RECEIVED_MESSAGE: 'USER_RECEIVED_MESSAGE',
} as const;

/**
 * chat service responsibilities:
 * 1. receive new messages / messages updates from users
 *    a. save them in the database
 *    b. validate them
 *    c. push them to the receiving user
 * 2. answer to the users's get requests when they logging in and want to see their new messages / messages history / if their messages were read
 * 3. receive the user's "messages received" request
 *    a. update the messages status in the database
 *    b. push the messages to the sending user
 */
