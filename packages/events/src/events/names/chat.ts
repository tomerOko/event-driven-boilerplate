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
 * 1. receive 'new message' / 'message updated' / 'message received' from users
 *    a. validate them - (no harmful content, no spam, no empty messages)
 *    b. save them in the database
 *    c. push them to the receiving user
 *    d. answer to the users's get requests (when they get into the chat)
 */
