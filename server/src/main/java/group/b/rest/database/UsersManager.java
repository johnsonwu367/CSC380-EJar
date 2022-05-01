package group.b.rest.database;

import java.util.ArrayList;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.DeleteResult;

import org.bson.Document;

public class UsersManager {
    private MongoCollection<Document> users; 
    
    public UsersManager(MongoDatabase database) {
        this.users = database.getCollection("Users");
    }

    // Return all users existing in the database, shall only be used while developing.
    public ArrayList<Document> getAllUsers() {
        try {
            MongoCursor<Document> query = users.find().iterator();
            ArrayList<Document> ejarUsers = new ArrayList<>();
            while (query.hasNext()) {
                Document document = query.next();
                ejarUsers.add(document);
            }
        return ejarUsers;
        } catch (Exception e) {
            return null;
        }
    }

    // Get one user from the database, more commonly used
    public Document getUser(String email, String givenName, String familyName) {
        try {
            // Error handling
            if (email == null) {return null;} else {email = email.toLowerCase();}
            if (givenName == null) {givenName = "";}
            if (familyName == null) {familyName = "";}

            // Look for the user in the database.
            Document user = users.find(new Document("email", email)).first();

            // If none exist a new user will be created.
            if (user == null) {
                user = new Document("email", email).append("given_name", givenName).append("family_name", familyName);
                users.insertOne(user);
            }

            // If the user's name changed it will be updated.
            if (!user.get("given_name").equals(givenName) || !user.get("family_name").equals(familyName)) {
                user.append("given_name", givenName).append("family_name", familyName);
                users.findOneAndUpdate(new Document("email", email), Updates.combine(Updates.set("given_name", givenName), Updates.set("family_name", familyName)));
            }

            return user;
        } catch (Exception e) {
            return null;
        }
    }

    // Pure get method.
    public Document getUser(String email) {
        try {
            if (email == null) {return null;}
            return users.find(new Document("email", email)).first();
        } catch (Exception e) {
            return null;
        }
    }

    // Delete an user, doubt it will ever be used...
    public boolean deleteUser(String email) {
        try {
            if (email == null) {return false;}
            DeleteResult result = users.deleteOne(new Document("email", email));
            return result.wasAcknowledged();
        } catch (Exception e) {
            return false;
        }
    }
}
