package group.b.rest.database;

import java.util.ArrayList;
import java.util.HashMap;

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

    // Return all the contents associated with such jar, and then add to each content the details of their owner.
    // Reason why this function is cursed with 3 loops is because it is cheaper to loop over local variables than TCP connections.
    public ArrayList<Document> readJar(String jarID) {
        try {
            ArrayList<Document> contents = contentsManager.getJarContents(jarID);
            HashMap<String, Document> usersInfo = new HashMap<>();
            
            // Identify the unique users of this contents collection.
            for (Document content : contents) {
                usersInfo.put(content.get("owner_email").toString(), new Document());
            }

            // Acquire the infomations about such users (TCP involved).
            for (String email : usersInfo.keySet()) {
                usersInfo.put(email, usersManager.getUser(email));
            }

            // Add them back into the contents.
            for (Document content : contents) {
                String email = content.get("owner_email").toString();
                String givenName = usersInfo.get(email).get("given_name").toString();
                String familyName = usersInfo.get(email).get("family_name").toString();
                content.append("given_name", givenName).append("family_name", familyName);
            }
            return contents;
        } catch (Exception e) {
            return null;
        }
    }

    // The function becomes a lot shorter since it involves only 1 email.
    public ArrayList<Document> readJar(String jarID, String ownerEmail) { 
        try {
            ArrayList<Document> contents = contentsManager.getJarContents(jarID, ownerEmail); 
            Document userInfo = usersManager.getUser(ownerEmail);
            String givenName = userInfo.get("given_name").toString();
            String familyName = userInfo.get("family_name").toString();

            for (Document content : contents) {
                content.append("given_name", givenName).append("family_name", familyName);
            }
            return contents;
        } catch (Exception e) {
            return null;
        }
    }


    // --------------- Various Update Jar Stuff------------------- //
    public ArrayList<String> getContributors(String jarID) { return eJarsManager.getContributors(jarID); }

    public boolean addContributor(String jarID, String contributorEmail) { return eJarsManager.addContributor(jarID, contributorEmail); }

    public boolean  removeContributor(String jarID, String contributorEmail) { return eJarsManager.removeContributor(jarID, contributorEmail) && contentsManager.deleteContributorContents(jarID, contributorEmail);}

    // Assign opening time ralative to current time
    public boolean setOpeningTime(String jarID, int daysFromNow, int hoursFromNow, int minutesFromNow) { return eJarsManager.setOpeningTime(jarID, daysFromNow, hoursFromNow, minutesFromNow); }

    public boolean clearOpeningTime(String jarID) { return eJarsManager.clearOpeningTime(jarID); }
    // --------------- End of Update Jar Stuff --------------------//

    // Delete an jar by it's unique id, and all the contents associated with it as well.
    public boolean deleteJar(String jarID) { return eJarsManager.deleteJar(jarID) && contentsManager.deleteJarContents(jarID); }

    
    // ----------------------------------------------------- Content Object Operations -----------------------------------------//
    public boolean createContent(String jarID, String ownerEmail, String message) { return contentsManager.createContent(jarID, ownerEmail, message); }

    // No need for read content, since all the content informations are retrived by readJar()

    public boolean updateContent(String contentID, String newMessage) { return contentsManager.updateContent(contentID, newMessage); }

    public boolean deleteContent(String contentID) { return contentsManager.deleteContent(contentID); }
}
