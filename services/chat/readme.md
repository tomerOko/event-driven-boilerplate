**service flow/s:**

<u>user signing up to the system for the first time</u>

1. validating the user is the owner of the provided email (using email pincode or oAuth mechanism)
2. save the user details (email, first name, last name, password/oath token)
3. publish an event for any other service needing the any of the details
   - the email and the password/token is only published for the signup service to subscription. the rest of the services will get
     the user (who sent the handled request) email from the JWT payload

<br></br> **todos:**

- finish setting up the mail sender (it needs some email account to send the emails from)
- set up google oAuth
  - sign up to the google developer cloud
  - install the needed sdk
  - make sure it is working
  - update types
