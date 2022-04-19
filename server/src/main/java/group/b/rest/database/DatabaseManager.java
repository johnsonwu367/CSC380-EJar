package group.b.rest.database;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import javax.enterprise.context.ApplicationScoped;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

@ApplicationScoped
public class DatabaseManager {
    public MongoDatabase getDatabase() {
        String username = URLEncoder.encode(System.getenv("MONGO_USERNAME"), StandardCharsets.UTF_8);
        String password = URLEncoder.encode(System.getenv("MONGO_PASSWORD"), StandardCharsets.UTF_8);
        String rest = "@cluster0-shard-00-00.faubx.mongodb.net:27017,cluster0-shard-00-01.faubx.mongodb.net:27017,cluster0-shard-00-02.faubx.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-5po8sy-shard-0&authSource=admin&retryWrites=true&w=majority";
        String full = "mongodb://" + username + ":" + password + rest;

        // String rest = "@cluster0.faubx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        // String full = "mongodb+srv://" + username + ":" + password + rest;
        MongoClient mongoClient = MongoClients.create(full);
        return mongoClient.getDatabase("EJar");
    }
}
