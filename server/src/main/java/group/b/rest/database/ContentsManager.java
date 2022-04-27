package group.b.rest.database;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;

import org.bson.Document;
import org.bson.types.ObjectId;

import static com.mongodb.client.model.Filters.eq;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

public class ContentsManager {
    private MongoCollection<Document> contents;

    public ContentsManager(MongoDatabase database) {
        this.contents = database.getCollection("Contents");
    }


    // --------------------------------------------------- Start of Create Operations ----------------------------------------------- //
    public boolean createContent(String jarID, String ownerEmail, String message) {
        Calendar calendar = Calendar.getInstance();
        Date date = calendar.getTime();
        Document content = new Document("jar_id", jarID)
                            .append("owner_email", ownerEmail)
                            .append("message", message)
                            .append("created", date);
        try {
            contents.insertOne(content);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    // --------------------------------------------------- End of Create Operations ------------------------------------------------- //


    // --------------------------------------------------- Start of Read Operations ------------------------------------------------- //
    // Get all contents existing in the database, shall only be only while developing.
    public ArrayList<Document> getAllContent() {
        try {
            MongoCursor<Document> query = contents.find().iterator();
            ArrayList<Document> contents = new ArrayList<>();
            while (query.hasNext()) {
                Document document = query.next();
                contents.add(document);
            }
            return contents;
        } catch (Exception e) {
            return null;
        }
    }
    
    // Get all contents associated with the jar.
    public ArrayList<Document> getJarContents(String jarID) {
        try {
            ArrayList<Document> documents = new ArrayList<>();
            MongoCursor<Document> query = contents.find(eq("jar_id", jarID)).iterator();
            while (query.hasNext()) {
                Document document = query.next();
                document.append("id_String", document.get("_id").toString());
                documents.add(document);
            }
            return documents;
        } catch (Exception e) {
            return null;
        }
    }

    // Get contents associated with the jar and the user email.
    public ArrayList<Document> getJarContents(String jarID, String ownerEmail) {
        try {
            ArrayList<Document> documents = new ArrayList<>();
            Document filter = new Document("jar_id", jarID).append("owner_email", ownerEmail);
            MongoCursor<Document> query = contents.find(filter).iterator();
            while (query.hasNext()) {
                Document document = query.next();
                document.append("id_String", document.get("_id").toString());
                documents.add(document);
            }
            return documents;
        } catch (Exception e) {
            return null;
        }
    }
    // ----------------------------------------------------- End of Read Operations -------------------------------------------------- //


    // --------------------------------------------------- Start of Update Operations ------------------------------------------------ //
    public boolean updateContent(String contentID, String newMessage) {
        try {
            ObjectId objectID = new ObjectId(contentID);
            UpdateResult result = contents.updateOne(eq("_id", objectID), Updates.set("message", newMessage));
            return result.wasAcknowledged();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean deleteContent(String contentID) {
        try {
            ObjectId objectID = new ObjectId(contentID);
            DeleteResult result = contents.deleteOne(eq("_id", objectID));
            return result.wasAcknowledged();
        } catch (Exception e) {
            return false;
        }
    }
    // --------------------------------------------------- End of Update Operations --------------------------------------------------- //


    // --------------------------------------------------- Start of Delete Operations ------------------------------------------------- //
    public boolean deleteUserContents(String email) {
        DeleteResult result = contents.deleteMany(eq("owner_email", email));
        return result.wasAcknowledged();
    }

    public boolean deleteJarContents(String jarID) {
        DeleteResult result = contents.deleteMany(eq("jar_id", jarID));
        return result.wasAcknowledged();
    }

    public boolean deleteContributorContents(String jarID, String contributorEmail) {
        Document filter = new Document("jar_id", jarID).append("owner_email", contributorEmail);
        DeleteResult result = contents.deleteMany(filter);
        return result.wasAcknowledged();
    }
    // --------------------------------------------------- End of Delete Operations --------------------------------------------------- //
}
