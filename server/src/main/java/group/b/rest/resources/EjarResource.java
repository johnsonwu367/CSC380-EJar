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
    @Path("/getUser")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser() {
        Document user = new EjarInterface().getUser("kfeng2@oswego.edu", "Kevin", "Feng");
        return Response.status(Response.Status.OK).entity(user).build();
    }

    @GET
    @Path("/createJar")
    @Produces(MediaType.APPLICATION_JSON)
    public Response createJar() {
        EjarInterface ejarInterface = new EjarInterface();
        ejarInterface.createJar("kfeng2@oswego.edu", "TEMPJAR1");
        Document user = new EjarInterface().getUser("kfeng2@oswego.edu", "Kevin", "Feng");
        return Response.status(Response.Status.OK).entity(user).build();
    }

    @GET
    @Path("/deleteJar")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteJar() {
        EjarInterface ejarInterface = new EjarInterface();
        ejarInterface.deleteJar("6251fa281b063064fdba6597");
        Document user = new EjarInterface().getUser("kfeng2@oswego.edu", "Kevin", "Feng");
        return Response.status(Response.Status.OK).entity(user).build();
    }

    @GET
    @Path("/createContent")
    @Produces(MediaType.APPLICATION_JSON)
    public Response createContent() {
        EjarInterface ejarInterface = new EjarInterface();
        ArrayList<Document> contents = ejarInterface.createContent("6250c6a3e09cd95052fb420b", "kfeng2@oswego.edu", "Temp Content");
        return Response.status(Response.Status.OK).entity(contents).build();
    }
}

