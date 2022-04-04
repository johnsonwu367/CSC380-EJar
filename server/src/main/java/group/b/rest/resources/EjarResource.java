package group.b.rest.resources;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.bson.Document;

import group.b.rest.database.EjarInterface;

@Path("ejar")
public class EjarResource{
    
    // testing get request
    @GET
    public String helloWorld() {
        return "hello world!";
    }

    @POST
    @Path("login")
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(String request){
        // returns or echos the request sent from the frontend 
        return Response.status(Response.Status.OK).entity(request).build();
        // When MongoDB is implemented this login response function will grab user account info from the database using the
        // user email as ID. It should work as follows:
        //
        // if user email is found in database: return respective user data or account information
        // else create a new user instance or account in the database with users' google email.
    }

    @GET
    @Path("/get-all-users")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUsers() {
        List <Document> allUsers = new EjarInterface().getAllUsers();
        return Response.status(Response.Status.OK).entity(allUsers).build();
    }

}

