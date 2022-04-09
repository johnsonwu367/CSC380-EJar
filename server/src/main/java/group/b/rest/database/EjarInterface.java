package group.b.rest.database;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;

public class EjarInterface {
    private MongoDatabase ejarDB;
    private MongoCollection<Document> ejarCollection;
    private MongoCollection<Document> usersCollection; 
    private MongoCollection<Document> contentsCollection;

    public EjarInterface() {
        DatabaseManager databaseManager = new DatabaseManager();

        try {
            // Connect to DB
            ejarDB = databaseManager.getDatabase();
        } catch (Exception e) {
            e.printStackTrace();
            throw new WebApplicationException(Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Failed to connect to database.").build());
        }
    }

    // ----------------------------------------------------------- Test case ------------------------------------------------------//
    public ArrayList<Document> getAllUsers() {
        usersCollection = ejarDB.getCollection("Users");
        MongoCursor<Document> query = usersCollection.find().iterator();
        ArrayList<Document> ejarUsers = new ArrayList<>();
        while (query.hasNext()) {
            Document document = query.next();
            ejarUsers.add(document);
        }
        return ejarUsers;
    }


    
    // ------------------------------------------------------------- In progress codes ------------------------------------------------//

    // Returns an arraylist of the search result with the given collection.
    private ArrayList<Document> getDocuments(MongoCollection<Document> collection, String key, String value) {
        ArrayList<Document> documents = new ArrayList<>();
        MongoCursor<Document> query = collection.find(new Document(key, value)).iterator();
        while (query.hasNext()) {
            documents.add(query.next());
        }
        return documents;
    }

    // Get an user from the database, if none exist a new user will be created.
    // This user's jars are also included in the document
    public Document getUser(String email, String givenName, String familyName) {
        usersCollection = ejarDB.getCollection("Users");
        Document user = usersCollection.find(new Document("email", email)).first();
        
        if (user == null) {
            user = new Document("email", email).append("given_name", givenName).append("family_name", familyName);
        } else {
            ejarCollection = ejarDB.getCollection("Jars");
            ArrayList<Document> userJars = getDocuments(ejarCollection, "owner_email", email);
            user.append("jars_owned", userJars);
            ArrayList<Document> contributingJars = getDocuments(ejarCollection, "contributors", email);
            user.append("jars_contributing", contributingJars);
        }

        return user;
    }
}
