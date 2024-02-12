# SOCKET-IO-CHAT-CLIENT

Small hiring exercise for frontend engineers. The questions are fairly open ended. 
Uses [socket-io-chat-server](https://github.com/Pixxle/socket-io-chat-server) as it's backend. 

Problem statements: 
You've been given the task to write a simple chat client that reads messages from a undocument socket.io server. 
If this practice problem would be developed into a fully fledged application, what are som engineering challenges it could potentially present?

* Task 1: Render incoming chat messages from the socket in the div. Each user has configured their prefered username color. 
* Task 2: Some users are colorblind, please create a colorblind option where the username for each chat message is switched from their selected color to a default black with bolded text.
* Task 3: We are always currently displaying the first message received since we joined, for this to be a useful chat we would like to instead automatically  scroll to the latest message.
* Task 4: Please create an input field with a button that will send a chat message to the server.


Engineering Challenges:
* Make sure that the server is able to handle a high volume of incoming connections. 
* Security such as encrypted messages and prevent unauthorized access.
* Ensuring low latency 