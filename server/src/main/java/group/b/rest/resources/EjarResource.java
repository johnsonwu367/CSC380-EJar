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
import org.json.JSONArray;
import org.json.JSONObject;

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
        EjarInterface database = new EjarInterface();
        List <Document> allUsers = database.getAllUsers();
        database.close();
        return Response.status(Response.Status.OK).entity(allUsers).build();
    }

    @GET
    @Path("/test")
    @Produces(MediaType.APPLICATION_JSON)
    public Response test() {
        EjarInterface database = new EjarInterface();
        ArrayList<Document> contents = database.readJar("62686224968a1c33b2ce22f6");
        database.close();
        return Response.status(Response.Status.OK).entity(contents).build();
    }

    @POST
    @Path("/getUserInfo")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser(String info) {
        JSONObject userInfo = new JSONObject(info);
        String userEmail = userInfo.getString("email");
        String givenName = userInfo.getString("givenName");
        String familyName = userInfo.getString("familyName");
        EjarInterface database = new EjarInterface();
        Document user = database.getUser(userEmail, givenName, familyName);
        database.close();
        return Response.status(Response.Status.OK).entity(user).build();
    }

    @POST
    @Path("/getJar")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJars(String email) {
        // System.out.println(email);
        EjarInterface database = new EjarInterface();
        ArrayList <Document> jars = database.getUserJars(email);
        database.close();
        return Response.status(Response.Status.OK).entity(jars).build();
    }

    @POST
    @Path("/createJar")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserJars(String info) {
        JSONObject jarInfo = new JSONObject(info);
        String email = jarInfo.getString("email");
        String name = jarInfo.getString("name");
        String tag = jarInfo.getString("tag");
        String type = jarInfo.getString("type");
        EjarInterface database = new EjarInterface();
        database.createJar(email, name, tag, type);
        database.close();
        return Response.status(Response.Status.OK).entity("jar creation success").build();
    }

    @POST
    @Path("/deleteJar")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteJar(String jarId) {
        EjarInterface database = new EjarInterface();
        database.deleteJar(jarId);
        database.close();
        return Response.status(Response.Status.OK).entity("jar deletion success").build();
    }

    @POST
    @Path("/addJarContent")
    @Produces(MediaType.APPLICATION_JSON)
    public Response addJarContent(String info) {
        JSONObject jarInfo = new JSONObject(info);
        String jarId = jarInfo.getString("jarId");
        String email = jarInfo.getString("email");
        String message = jarInfo.getString("message");
        EjarInterface database = new EjarInterface();
        database.createContent(jarId, email, message);
        database.close();
        return Response.status(Response.Status.OK).entity("adding jar content success").build();
    }

    @POST
    @Path("/getJarContent")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJarContent(String info) {
        JSONObject jarInfo = new JSONObject(info);
        String jarId = jarInfo.getString("jarId");
        String ownerEmail = jarInfo.getString("email");
        EjarInterface database = new EjarInterface();
        ArrayList<Document> jarContents = database.readJar(jarId, ownerEmail);
        database.close();
        return Response.status(Response.Status.OK).entity(jarContents).build();
    }
    
    @POST
    @Path("/addContributor")
    @Produces(MediaType.APPLICATION_JSON)
    public Response addContributor(String info) {
        JSONObject jarInfo = new JSONObject(info);
        String jarId = jarInfo.getString("jarId");
        String contributorEmail = jarInfo.getString("email");
        EjarInterface database = new EjarInterface();
        database.addContributor(jarId, contributorEmail);
        database.close();
        return Response.status(Response.Status.OK).entity("adding contributor success").build();
    }

    @POST
    @Path("/deleteContent")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteContent(String contentID) {
        EjarInterface database = new EjarInterface();
        database.deleteContent(contentID);
        database.close();
        return Response.status(Response.Status.OK).entity("content deletion success").build();
    }

    @POST
    @Path("/updateContent")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateContent(String info) {
        JSONObject jarInfo = new JSONObject(info);
        String contentID = jarInfo.getString("content_id");
        String newMessage = jarInfo.getString("message");
        EjarInterface database = new EjarInterface();
        database.updateContent(contentID, newMessage);
        database.close();
        return Response.status(Response.Status.OK).entity("content update success").build();
    }

    @POST
    @Path("/setOpeningTime")
    @Produces(MediaType.APPLICATION_JSON)
    public Response setOpeningTime(String info) {
        JSONObject jarInfo = new JSONObject(info);
        // System.out.println(jarInfo);
        String jarID = jarInfo.getString("jar_id");
        int daysFromNow = Integer.valueOf(jarInfo.getString("days"));
        int hoursFromNow = Integer.valueOf(jarInfo.getString("hours"));
        int minutesFromNow = Integer.valueOf(jarInfo.getString("minutes"));
        EjarInterface database = new EjarInterface();
        database.setOpeningTime(jarID, daysFromNow, hoursFromNow, minutesFromNow);
        database.close();
        return Response.status(Response.Status.OK).entity("opening time set").build();
    }

    @POST
    @Path("/openJar")
    @Produces(MediaType.APPLICATION_JSON)
    public Response openJar(String jarID) {
        EjarInterface database = new EjarInterface();
        ArrayList <Document> contents = database.readJar(jarID);
        database.close();
        return Response.status(Response.Status.OK).entity(contents).build();
    }

    @POST
    @Path("/getContributors")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getContributors(String jarID) {
        EjarInterface database = new EjarInterface();
        ArrayList<String> contributors = database.getContributors(jarID);
        database.close();
        return Response.status(Response.Status.OK).entity(contributors).build();
    }

    @POST
    @Path("/removeContributor")
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeContributor(String info) {
        JSONObject jarInfo = new JSONObject(info);
        String jarID = jarInfo.getString("jarId");
        JSONArray contributorEmails = jarInfo.getJSONArray("emails");
        EjarInterface database = new EjarInterface();
        for (Object contributorEmail : contributorEmails) {
            // System.out.println(contributorEmail.toString());
            database.removeContributor(jarID, contributorEmail.toString());
        }
        database.close();
        return Response.status(Response.Status.OK).entity("contributor(s) successfully removed").build();
    }

}

