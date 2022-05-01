package group.b.rest.database;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Locale;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.DeleteResult;

import static com.mongodb.client.model.Filters.eq;

import org.bson.Document;
import org.bson.types.ObjectId;

public class EJarsManager {
    private MongoCollection<Document> ejars;

    public EJarsManager(MongoDatabase database) {
        this.ejars = database.getCollection("Jars");
    }


    // ----------------------------------------------------- Start of Create Operations -------------------------------------------------- //
    // Create an jar with owner being the email given, no contents and no contributors, duplicate names are allowed.
    public boolean createJar(String email, String jarName, String tag, String type) {
        // Error handling
        if (email == null) {return false;}
        if (jarName == null) {jarName = "";}
        if (tag == null) {tag = "";}
        if (type == null) {type = "";}

        Document jar = new Document("owner_email", email)
                        .append("contributors", new ArrayList<Document>())
                        .append("name", jarName)
                        .append("tag", tag)
                        .append("type", type)
                        .append("opening_Time", 0);
        try {
            ejars.insertOne(jar);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    // ----------------------------------------------------- End of Create Operations ---------------------------------------------------- //


    // ----------------------------------------------------- Start of Read Operations ---------------------------------------------------- //
    // Return all jars existing in the database, shall only be used while developing.
    public ArrayList<Document> getAllJars() {
        try {
            MongoCursor<Document> query = ejars.find().iterator();
            ArrayList<Document> ejars = new ArrayList<>();
            while (query.hasNext()) {
                Document document = query.next();
                ejars.add(document);
            }
            return ejars;
        } catch (Exception e) {
            return null;
        }
    }

    // Return an arraylist containing all the jars that this user owns and contributes to.
    public ArrayList<Document> getUserJars(String email) {
        if (email == null) { return null; }

        Document document = new Document();
        ArrayList<Document> userJars = new ArrayList<>();

        try {
            // Find all the jars this user owned
            MongoCursor<Document> query = ejars.find(eq("owner_email", email)).iterator();
            while (query.hasNext()) {
                document = query.next();
                // if (document.getList("contributors", String.class).size() > 0) {
                //     document.append("type", "shared");
                // } else {
                //     document.append("type", "personal");
                // }
                document.append("id_String", document.get("_id").toString())
                        .append("status", getOpeningStatus(document));
                userJars.add(document);
            }

            // Find all the jars this user is contributing to
            query = ejars.find(eq("contributors", email)).iterator();
            while (query.hasNext()) {
                document = query.next();
                document.append("type", "contributing")
                        .append("id_String", document.get("_id").toString())
                        .append("status", getOpeningStatus(document));
                userJars.add(document);
            }

            return userJars;
        } catch (Exception e) {
            return null;
        }
    }

    // Assumes the jarID is an valid hexidecimal representation of Object ID.
    public ArrayList<String> getContributors(String jarID) {
        if (jarID == null) {return null;}

        try {
            ObjectId idObject = new ObjectId(jarID);
            Document jar = ejars.find(eq("_id", idObject)).first();
            if (jar == null) {
                return null;
            } else {
                ArrayList<String> contributors = jar.get("contributors", new ArrayList<String>().getClass());
                return contributors;
            }
        } catch (Exception e) {
            return null;
        }
    }
    // ----------------------------------------------------- End of Read Operations ---------------------------------------------------- //


    // ----------------------------------------------------- Start of Update Operations ------------------------------------------------ //
    public boolean addContributor(String jarID, String contributorEmail) {
        if (jarID == null || contributorEmail == null) {return false;}

        try {
            ObjectId idObject = new ObjectId(jarID);
            ejars.findOneAndUpdate(eq("_id", idObject), Updates.addToSet("contributors", contributorEmail));
            return true;
        } catch (Exception e) {
            return false;
        }
        
    }

    public boolean removeContributor(String jarID, String contributorEmail) {
        if (jarID == null || contributorEmail == null) {return false;}

        try {
            ObjectId idObject = new ObjectId(jarID);
            ejars.findOneAndUpdate(eq("_id", idObject), Updates.pull("contributors", contributorEmail));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Assign opening time ralative to current time
    public boolean setOpeningTime(String jarID, int daysFromNow, int hoursFromNow, int minutesFromNow) {
        if (jarID == null) {return false;}

        try {
            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.MINUTE, minutesFromNow);
            calendar.add(Calendar.HOUR, hoursFromNow);
            calendar.add(Calendar.DATE, daysFromNow);
            ObjectId objectID = new ObjectId(jarID);
            ejars.findOneAndUpdate(eq("_id", objectID), Updates.set("opening_Time", calendar.getTime()));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean clearOpeningTime(String jarID) {
        if (jarID == null) {return false;}

        try {
            ObjectId objectID = new ObjectId(jarID);
            ejars.findOneAndUpdate(eq("_id", objectID), Updates.set("opening_Time", 0));
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    // ----------------------------------------------------- End of Update Operations -------------------------------------------------- //


    // ----------------------------------------------------- Start of Delete Operations ------------------------------------------------ //
    // Delete an single jar
    public boolean deleteJar(String jarID) {
        try {
            ObjectId idObject = new ObjectId(jarID);
            DeleteResult result = ejars.deleteOne(eq("_id", idObject));
            return result.wasAcknowledged();
        } catch (Exception e) {
            return false;
        }
    }

    // Delete all the jars an user ownes
    public boolean deleteUserJars(String email) {
        DeleteResult result = ejars.deleteMany(eq("owner_email", email));
        return result.wasAcknowledged();
    }
    // ----------------------------------------------------- End of Delete Operations -------------------------------------------------- //



    // ----------------------------------------------------- Start of General Functions ---------------------------------------------- //
    public String getOpeningStatus(Document jar) {
        String openString = jar.get("opening_Time").toString();
        if (openString.equals("0")) {
            return "notSet";
        } else {
            try {
                Calendar now = Calendar.getInstance();
                Calendar openTime = Calendar.getInstance();
                SimpleDateFormat sdf = new SimpleDateFormat("EEE MMM dd HH:mm:ss z yyyy", Locale.ENGLISH);
                openTime.setTime(sdf.parse(openString));

                int result = now.compareTo(openTime);
                if (result <= 0) {
                    return "notOpenable";
                } else {
                    return "openable";
                }
            } catch (ParseException exception) {
                System.out.println("Whoops, error while parsing jar opening times...");
                return "notSet";
            }
        }
    }
    // -------------------------------------------------------- End of General Functions --------------------------------------------- //
}
