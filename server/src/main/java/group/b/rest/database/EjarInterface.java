package group.b.rest.database;

import java.util.ArrayList;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.FindOneAndDeleteOptions;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import static com.mongodb.client.model.Filters.eq;

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

    // ----------------------------------------------------------- For development purposese? ------------------------------------------------------//
    public ArrayList<Document> getAllUsers() {
        MongoCursor<Document> query = usersCollection.find().iterator();
        ArrayList<Document> ejarUsers = new ArrayList<>();
        while (query.hasNext()) {
            Document document = query.next();
            ejarUsers.add(document);
        }
        return ejarUsers;
    }

    public ArrayList<Document> getAllJars() {
        MongoCursor<Document> query = ejarCollection.find().iterator();
        ArrayList<Document> ejars = new ArrayList<>();
        while (query.hasNext()) {
            Document document = query.next();
            ejars.add(document);
        }
        return ejars;
    }

    public ArrayList<Document> getAllContent() {
        MongoCursor<Document> query = contentsCollection.find().iterator();
        ArrayList<Document> contents = new ArrayList<>();
        while (query.hasNext()) {
            Document document = query.next();
            contents.add(document);
        }
        return contents;
    }


    
    // ------------------------------------------------------------------- General Stuff ------------------------------------------------------//

    // Returns an arraylist of the search result with the given collection.
    private ArrayList<Document> getDocuments(MongoCollection<Document> collection, String key, String value) {
        ArrayList<Document> documents = new ArrayList<>();
        MongoCursor<Document> query = collection.find(new Document(key, value)).iterator();
        while (query.hasNext()) {
            documents.add(query.next());
        }
        return documents;
    }

    // Same as above method but takes in one more pair of filters
    private ArrayList<Document> getDocuments(MongoCollection<Document> collection, String key1, String value1, String key2, String value2) {
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
        }

        return user;
    }

    // Return an arraylist containing all the jars that this user owns and contributes to.
    public ArrayList<Document> getUserJars(String email) {
        Document document = new Document();
        ArrayList<Document> userJars = new ArrayList<>();

        // Find all the jars this user owned
        MongoCursor<Document> query = ejarCollection.find(eq("owner_email", email)).iterator();
        while (query.hasNext()) {
            document = query.next();
            if (document.getList("contributors", String.class).size() > 0) {
                document.append("type", "shared");
            } else {
                document.append("type", "private");
            }
            document.append("id_String", document.get("_id").toString());
            userJars.add(document);
        }

        // Find all the jars this user is contributing to
        query = ejarCollection.find(eq("contributors", email)).iterator();
        while (query.hasNext()) {
            document = query.next();
            document.append("type", "contributing");
            document.append("id_String", document.get("_id").toString());
            userJars.add(document);
        }

        return userJars;
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
    public void createJar(String email, String jarName, String tag) {
        Document jar = new Document("owner_email", email)
                        .append("contributors", new ArrayList<Document>())
                        .append("name", jarName)
                        .append("tag", tag)
                        .append("opening_Time", 0);
        ejarCollection.insertOne(jar);
    }

    // Return an arraylist of all the contents associated with this jar
    public ArrayList<Document> readJar(String jarID) {return getDocuments(contentsCollection, "jar_id", jarID);}

    // Or an arraylist of the contents associated with a specific user
    public ArrayList<Document> readJar(String jarID, String ownerEmail) {
        return getDocuments(contentsCollection, "jar_id", jarID, "owner_email", ownerEmail);
    }

    // Various Update Jar Stuff
    public void addContributor(String jarID, String contributorEmail) {
        ObjectId idObject = new ObjectId(jarID);
        ejarCollection.findOneAndUpdate(eq("_id", idObject), Updates.addToSet("contributors", contributorEmail));
    }

    public void removeContributor(String jarID, String contributorEmail) {
        ObjectId idObject = new ObjectId(jarID);
        ejarCollection.updateOne(eq("_id", idObject), Updates.pull("contributors", contributorEmail));
    }


    // Delete an jar by it's unique id, and all the contents associated with it as well.
    public void deleteJar(String jarID) {
        ObjectId idObject = new ObjectId(jarID);
        ejarCollection.deleteOne(new Document("_id", idObject));
        contentsCollection.deleteMany(new Document("jar_id", jarID));
    }

    // ----------------------------------------------------- Content Object Operations -----------------------------------------//
    // Create an content object that associates with the jar id, it's owner's email, and timestamp it.
    public void createContent(String jarID, String ownerEmail, String message) {
        java.util.Date date = new java.util.Date();
        Document content = new Document("jar_id", jarID)
                            .append("owner_email", ownerEmail)
                            .append("message", message)
                            .append("created", date);
        contentsCollection.insertOne(content);
    }

    // No need for read content, since all the content informations are retrived by readJar()

    // Saves the content into the database, if one exist it will be overwritten, return an arraylist of contents in that jar.
    public boolean updateContent(String contentID, String newMessage) {
        ObjectId objectID = new ObjectId(contentID);
        UpdateResult result = contentsCollection.updateOne(eq("_id", objectID), Updates.set("message", newMessage));
        return result.wasAcknowledged();
    }

    // Create content with the given id.
    public boolean deleteContent(String contentID) {
        ObjectId idObject = new ObjectId(contentID);
        contentsCollection.deleteOne(new Document("_id", idObject));
        DeleteResult result = contentsCollection.deleteOne(new Document("jar_id", contentID));
        return result.wasAcknowledged();
    }
}
