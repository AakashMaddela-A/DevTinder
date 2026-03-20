# Devtinder apis

## auth router
-POST /signup
-POST /login
-POST /logout

## profile router
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

## connection request router
-POST /request/send/intrested/:userid
-POST /request/send/ignore/:userid

-POST /request/review/accepted/:requestID
-POST /request/review/rejected/:requestID

## user router
-GET /connections
-GET /requests/received
-GET /feed/


status: ignore, intrested, accepted, rejected
