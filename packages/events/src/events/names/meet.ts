export const meetEventsNames = {
  /** subscribed by:
   * chat service to mark the user as 'in meeting'
   * search process to make the teacher un available
   */
  MEETING_STARTED: 'MEETING_STARTED',
  /** subscribed by:
   * payment service to initiate payment process
   * search process to make the teacher un available
   */
  MEETING_ENDED: 'MEETING_ENDED',
  USER_LISTENING_ON_PEER: 'USER_LISTENING_ON_PEER',
} as const;
