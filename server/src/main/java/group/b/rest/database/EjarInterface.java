package group.b.rest.database;

import java.util.ArrayList;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

import com.mongodb.client.MongoDatabase;

import org.bson.Document;

public class EjarInterface {
    private MongoDatabase ejarDB;
    private EJarsManager eJarsManager;
    private UsersManager usersManager; 
    private ContentsManager contentsManager;

    public EjarInterface() {
        DatabaseManager databaseManager = new DatabaseManager();

        try {
            // Connect to DB
            ejarDB = databaseManager.getDatabase();
            usersManager = new UsersManager(ejarDB);
            eJarsManager = new EJarsManager(ejarDB);
            contentsManager = new ContentsManager(ejarDB);
        } catch (Exception e) {
            e.printStackTrace();
            throw new WebApplicationException(Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Failed to connect to database.").build());
        }
    }


    // ----------------------------------------------------------- For development purposese? ------------------------------------------------------//
    public ArrayList<Document> getAllUsers() { return usersManager.getAllUsers(); }

    public ArrayList<Document> getAllJars() { return eJarsManager.getAllJars(); }

    public ArrayList<Document> getAllContent() { return contentsManager.getAllContent(); }

    public String getObjectId(Document object) { return object.get("_id").toString();}


    // -------------------------------------------------------------- User Object Operations ------------------------------------------------//
    public Document getUser(String email, String givenName, String familyName) { return usersManager.getUser(email, givenName, familyName); }

    public ArrayList<Document> getUserJars(String email) { return eJarsManager.getUserJars(email); }

    // Note everything associated with this email is also deleted.
    public boolean deleteUser(String email) {
        boolean userResult = usersManager.deleteUser(email);
        boolean ejarResult = eJarsManager.deleteUserJars(email);
        boolean contResult = contentsManager.deleteUserContents(email);
        return userResult && ejarResult && contResult;
    }


    // ------------------------------------------------------ EJar Object Operations -------------------------------------------//
    public boolean createJar(String email, String jarName, String tag, String type) { return eJarsManager.createJar(email, jarName, tag, type); }

    public ArrayList<Document> readJar(String jarID) { return contentsManager.getJarContents(jarID); }

    public ArrayList<Document> readJar(String jarID, String ownerEmail) { return contentsManager.getJarContents(jarID, ownerEmail); }


    // --------------- Various Update Jar Stuff------------------- //
    public void addContributor(String jarID, String contributorEmail) { eJarsManager.addContributor(jarID, contributorEmail); }

    public void removeContributor(String jarID, String contributorEmail) { eJarsManager.removeContributor(jarID, contributorEmail); }

    // Assign opening time ralative to current time
    public void setOpeningTime(String jarID, int daysFromNow, int hoursFromNow, int minutesFromNow) { eJarsManager.setOpeningTime(jarID, daysFromNow, hoursFromNow, minutesFromNow); }

    public void clearOpeningTime(String jarID) { eJarsManager.clearOpeningTime(jarID); }
    // --------------- End of Update Jar Stuff --------------------//

    // Delete an jar by it's unique id, and all the contents associated with it as well.
    public void deleteJar(String jarID) {
        eJarsManager.deleteJar(jarID);
        contentsManager.deleteJarContents(jarID);
    }

    
    // ----------------------------------------------------- Content Object Operations -----------------------------------------//
    public void createContent(String jarID, String ownerEmail, String message) { contentsManager.createContent(jarID, ownerEmail, message); }

    // No need for read content, since all the content informations are retrived by readJar()

    public void updateContent(String contentID, String newMessage) { contentsManager.updateContent(contentID, newMessage); }

    public void deleteContent(String contentID) { contentsManager.deleteContent(contentID); }
}
