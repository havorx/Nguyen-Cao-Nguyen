# Live scoreboard architecture design

For best demonstration for flow of execution, sequence diagram is reasonably suitable

![scoreboard diagram](https://github.com/havorx/Nguyen-Cao-Nguyen/blob/main/problem6/live-scoreboard-diagram.jpg?raw=true)

The including main components in the diagram are:

- Users: Users in this case are client machine, creating action that updates their score

- Viewers: Viewers are client machine that are spectating the scoreboard live

- Server: Server will be a conventional Node http server along with a websocket server instance, using SocketIO or uWebSockets

- Database: Database can be any type of database depending on the busisness needs

## Design explanation

- Each viewers accessing the scoreboard page will be connected to the socket server to wait for the notification for refetching the scoreboard

- Every time users create an action updating their score, the server will query the database to make the changes

- When the database query is success, the socket instance will fire an event to all connected client machine (viewers) accessing the scoreboard

- The front-end is implemented to react to the event for refetching the scoreboard data

- To reduce client and server loads, throttling mechanism is advised to be implemented in the front-end api calls or backend event firing
  to limit the refetching calls to the server, so that the rapid new user score updates does not cause performance degradation

- To prevent malicious users, types of authentication solution can be applied, like using simple custom jwt access token validation, or using OAuth authentication protocol

- Banning users from doing the action can also be managed by having a flag as an attribute in users datasource

- In a microservice environment, the authentication and authorisation can be handled by a centralized api gateway

- Having a discreet auth service to resolve the correct access roles to the request header before it is passed to the designated service can be beneficial
  if there are more busisness features and services beyond the mentioning scenario
