# MicroserviceBlog

In this project, I wanted to dive into the world of microservice. I also wanted to continue using the GraphQL API. Overall, my project has four services: Post, Comment, Query, Moderation. I also learned the concept behind an "event" bus and implemented my own simple version. Used React for the client. Finally, since this was a simple project, just used a json-server to store data. 

Here is how my client looked: 


<img width="1437" alt="Screen Shot 2020-05-08 at 1 49 17 AM" src="https://user-images.githubusercontent.com/45616379/81424508-ee2f5000-910a-11ea-9e34-ad0503117489.png">

## Services:

* ### Post
  * The Post Service had the responsibility to create a post, and display all the posts stored in the json-server.  
* ### Comment
  * The Comment Service had the responsibility to create a comment to a specific post, and display all comments tied to a       requested post. 
* ### Query
  * The Query Service had the responsibility to store the data whenever a Post or Comment Event was created. The purpose of     having this microservice is so that our client would only have to do ONE GET request, to get all of our data, rather than     calling the Post and Comment Service indiviually many times.  
* ### Moderation 
  * The Moderation Service had the responsibility to moderate the user-entered comments. When an user intially types a comment, the content of the comment is "This comment is awaiting moderation." After the Moderation Service does it's work (rejects if the string contains the word 'orange'), the client displays either the user-entered content or 'This comment has been rejected.' Usually, the moderation is instant, but hypothetically if the service went down, this project would still function. Each new comment would just say "This comment is awaiting moderation."
  
  Here is an image after the moderation is complete: 
  
  <img width="1405" alt="Screen Shot 2020-05-08 at 1 50 32 AM" src="https://user-images.githubusercontent.com/45616379/81425816-220b7500-910d-11ea-9356-16d65cd32322.png">
 ## Things I Learned 
 
 * Got an idea of how microservices work with the concept of event buses. The flow of the creating a post was that whenever a new post got entered, an event object would be emitted to the event bus. From there the event bus would emit that same event object to every service. The query service would use this object to update its storage. The most complicated flow was after adding the moderation service:
   * User Creates new comment -> Comment Service emits "CommentCreated" event to all other services -> Moderation service picks up event, moderates its content and emits "CommentModerated" to every service -> Comments Service recieves "CommentModerated" event and updates the comment content and emits "CommentUpdated" event to every service -> Query service picks up the "CommentUpdated" event, and updates that specific comment, which is being displayed on the client   
 * Learned how to update all services after they turn off and some events happen in between that they missed
    * In event bus, kept an array of events that had happend, and the query service would go through all the events in that array after starting.
 * Got more experience with GraphQL API 
