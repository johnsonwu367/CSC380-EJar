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
            ejarCollection = ejarDB.getCollection("Jars");
            usersCollection = ejarDB.getCollection("Users");
        } catch (Exception e) {
            e.printStackTrace();
            throw new WebApplicationException(Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Failed to connect to database.").build());
        }
    }

    public List<Document> getAllUsers() {
        MongoCursor<Document> query = usersCollection.find().iterator();
        List<Document> ejarUsers = new ArrayList<>();
        while (query.hasNext()) {
            Document document = query.next();
            ejarUsers.add(document);
        }
        return ejarUsers;
    }

}
