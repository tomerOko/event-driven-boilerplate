## Objective

this service allows a user to become a teacher. The user adds their bank account details (so we can pay them) and other necessary
details that need to known about them as teachers

## Listen to events:

- **UserCreated** event: Listens for 'UserCreated' events, capturing their first name and last name. (no need to for authorization
  (only signed up users cen become a teacher) because we validate's their JWT anyway)

- **UserCreated** event: Listens for 'UserUpdated' events, capturing any changes made to the user's first and last name

## Event Publishers

**TeacherCreated** event: Publishes 'TeacherCreated' events when a user successfully becomes a teacher. Includes the teacher
relevant information for the 'search' service

**TeacherUpdated** event: Publishes 'TeacherUpdated' events when any changes are made to a teacher's details, for the same reason
