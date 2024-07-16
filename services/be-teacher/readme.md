**service flow/s:**

<u>user becoming a teacher</u>

1. get additional details about the user such as spoken languages, age, gender, etc
2. save the details
3. publish an event for the rest of the services (such as the 'search' service)

<u>teacher want to update his details</u>

1. update the theacher document
2. publish an event for the rest of the services (such as the 'search' service)

<u>user stops being a teacher</u>

1. remove the theacher document
2. publish an event for the rest of the services (such as the 'search' service)

<br></br>

**todos:**

- add tests
