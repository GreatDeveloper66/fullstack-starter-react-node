+-----------------+       HTTP Requests       +--------------------+
|     Frontend    |  -----------------------> |      Backend       |
|   React App     |                           |  Express + MongoDB |
+-----------------+                           +--------------------+
         |                                                |
         | 1. User submits login/register form            |
         |------------------------------------------------>
         |                                                |
         | 2. Backend validates user and returns JWT      |
         <------------------------------------------------|
         |                                                |
         | 3. Token stored in localStorage                |
         |                                                |
         | 4. Axios attaches Authorization: Bearer <jwt>  |
         |------------------------------------------------>
         |                                                |
         | 5. Protected endpoints return user data        |
         <------------------------------------------------|
