export const calendarEventsNames = {} as const;

/**
 * *important note - a meating is 30 min by default, and it is allowed to shcedual 30 min ahead minimum
 * calendar service responsibilities:
 * 1. answer to the user's get requests (when they get into a topic and want to see availability calendar)
 * 2. receive 'new slot' / 'slot updated' / 'slot deleted' from teachers (slots can be a 'single time' or 'repeating daily/weekly')
 * 3. receive 'available now' / 'not available now' form teachers
 */

/**
 * ways of scheduling a meeting:
 * 1. teacher upload availability slots and a student book one of them, when the time comes one of them calls the other
 * 2. student send a 'asap' request, the teacher contact by chat and they
 *    * how dose it effect the shcedual?
 *        * if they choose a time that the teacher was not available any way. it doesn't effect the schedule
 *        * if they choose a time that the teacher was available: it is the teacher to be available at their slots. will add a quick way in the chat to send meeting invitation (and then they will also gain the remiders, google calendar integration etc, and the slots will be updated to 'on call')
 * 3. teacher set 'available now' and the student call him
 *        * how dose it effect the shcedual?
 *        * scheduling is only 30 minutes ahead. so there is no collision
 */
