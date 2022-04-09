package group.b.rest.database;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;

import org.bson.Document;
import org.bson.types.ObjectId;


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
            usersCollection = ejarDB.getCollection("Users");
            ejarCollection = ejarDB.getCollection("Jars");
            contentsCollection = ejarDB.getCollection("Contents");
        } catch (Exception e) {
            e.printStackTrace();
            throw new WebApplicationException(Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Failed to connect to database.").build());
        }
    }

    // ----------------------------------------------------------- Test case ------------------------------------------------------//
    public ArrayList<Document> getAllUsers() {
        MongoCursor<Document> query = usersCollection.find().iterator();
        ArrayList<Document> ejarUsers = new ArrayList<>();
        while (query.hasNext()) {
            Document document = query.next();
            ejarUsers.add(document);
        }
        return ejarUsers;
    }


    
    // ------------------------------------------------------------------- General Stuff ------------------------------------------------------//

    // Returns an arraylist of the search result with the given collection.
    public ArrayList<Document> getDocuments(MongoCollection<Document> collection, String key, String value) {
        ArrayList<Document> documents = new ArrayList<>();
        MongoCursor<Document> query = collection.find(new Document(key, value)).iterator();
        while (query.hasNext()) {
            documents.add(query.next());
        }
        return documents;
    }

    // Same as above method but takes in one more pair of filters
    public ArrayList<Document> getDocuments(MongoCollection<Document> collection, String key1, String value1, String key2, String value2) {
        ArrayList<Document> documents = new ArrayList<>();
        Document filter = new Document(key1, value1).append(key2, value2);
        MongoCursor<Document> query = collection.find(filter).iterator();
        while (query.hasNext()) {
            documents.add(query.next());
        }
        return documents;
    }

    public String getObjectId(Document object) { return object.get("_id").toString();}


    // -------------------------------------------------------------- User Object Operations ------------------------------------------------//
    // Get an user from the database, if none exist a new user will be created.
    // This user's jars are also included in the document
    public Document getUser(String email, String givenName, String familyName) {
        Document user = usersCollection.find(new Document("email", email)).first();
        
        if (user == null) {
            user = new Document("email", email).append("given_name", givenName).append("family_name", familyName);
            usersCollection.insertOne(user);
        } else {
            ArrayList<Document> userJars = getDocuments(ejarCollection, "owner_email", email);
            user.append("jars_owned", userJars);
            ArrayList<Document> contributingJars = getDocuments(ejarCollection, "contributors", email);
            user.append("jars_contributing", contributingJars);
        }

        return user;
    }

    // Delete an user and all of it's owned jars, doubt it will ever be used...
    public boolean deleteUser(String email) {
        usersCollection.deleteOne(new Document("email", email));
        ejarCollection.deleteMany(new Document("owner_email", email));
        DeleteResult result = contentsCollection.deleteMany(new Document("owner_email", email));
        return result.wasAcknowledged();
    }


    // ------------------------------------------------------ EJar Object Operations -------------------------------------------//
    // Create an jar with owner being the email given, no contents and no contributors, duplicate names are allowed.
    public ArrayList<Document> createJar(String email, String jarName) {
        Document jar = new Document("owner_email", email)
                        .append("contributors", new ArrayList<Document>())
                        .append("name", jarName)
                        .append("opening_Time", 0);
        ejarCollection.insertOne(jar);
        return getDocuments(ejarCollection, "owner_email", email);
    }

    // Return an arraylist of all the contents associated with this jar
    public ArrayList<Document> readJar(String jarID) {return getDocuments(contentsCollection, "jar_id", jarID);}

    // Or an arraylist of the contents associated with a specific user
    public ArrayList<Document> readJar(String jarID, String ownerEmail) {
        return getDocuments(contentsCollection, "jar_id", jarID, "owner_email", ownerEmail);
    }

    // Update jar attributes only, nothing to do with the contents associated with it.
    // public ArrayList<Document> updateJar


    // Delete an jar by it's unique id, and all the contents associated with it as well.
    public boolean deleteJar(String jarID) {
        ObjectId idObject = new ObjectId(jarID);
        ejarCollection.deleteOne(new Document("_id", idObject));
        DeleteResult result = contentsCollection.deleteMany(new Document("jar_id", jarID));
        return result.wasAcknowledged();
    }

    // ----------------------------------------------------- Content Object Operations -----------------------------------------//
    // Create an content object that associates with the jar id, it's owner's email, and timestamp it.
    public ArrayList<Document> createContent(String jarID, String ownerEmail, String message) {
        java.util.Date date = new java.util.Date();
        Document content = new Document("jar_id", jarID)
                            .append("owner_email", ownerEmail)
                            .append("message", message)
                            .append("created", date);
        contentsCollection.insertOne(content);
        return getDocuments(contentsCollection, "jar_id", jarID, "owner_email", ownerEmail);
    }

    // Create content with the given id.
    public boolean deleteContent(String contentID) {
        ObjectId idObject = new ObjectId(contentID);
        contentsCollection.deleteOne(new Document("_id", idObject));
        DeleteResult result = contentsCollection.deleteOne(new Document("jar_id", contentID));
        return result.wasAcknowledged();
    }
}
