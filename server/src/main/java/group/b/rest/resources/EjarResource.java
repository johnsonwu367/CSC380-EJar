package group.b.rest.resources;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.bson.Document;
import org.json.JSONObject;

import group.b.rest.database.EjarInterface;
import lombok.Getter;

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

    @GET
    @Path("/test")
    @Produces(MediaType.APPLICATION_JSON)
    public Response test() {
        EjarInterface database = new EjarInterface();
        database.updateContent("6252025ade0b77361f3b473b", "New message");
        ArrayList<Document> allContent = database.getAllContent();
        return Response.status(Response.Status.OK).entity(allContent).build();
    }

    @POST
    @Path("/getUserInfo")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser(String info) {
        JSONObject userInfo = new JSONObject(info);
        String userEmail = userInfo.getString("email");
        String givenName = userInfo.getString("givenName");
        String familyName = userInfo.getString("familyName");
        // System.out.println(userEmail);
        // System.out.println(givenName);
        // System.out.println(familyName);
        Document user = new EjarInterface().getUser(userEmail, givenName, familyName);
        // System.out.println(user);
        return Response.status(Response.Status.OK).entity(user).build();
    }

    @POST
    @Path("/createJar")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserJars(String email, String name) {
        EjarInterface cj = new EjarInterface();
        cj.createJar(email, name);
        return Response.status(Response.Status.OK).entity("jar creation success").build();
    }
    
}

