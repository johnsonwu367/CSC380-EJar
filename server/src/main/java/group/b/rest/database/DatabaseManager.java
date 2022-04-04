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
        String username = URLEncoder.encode("KunchengFeng", StandardCharsets.UTF_8);
        String password = URLEncoder.encode(System.getenv("MONGO_PASSWORD"), StandardCharsets.UTF_8);
        String rest = "@cluster0-shard-00-00.faubx.mongodb.net:27017,cluster0-shard-00-01.faubx.mongodb.net:27017,cluster0-shard-00-02.faubx.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-5po8sy-shard-0&authSource=admin&retryWrites=true&w=majority";
        String uri = "mongodb://" + username + ":" + password + rest;
        MongoClient client = MongoClients.create(uri);
        return client.getDatabase("EJar");
    }

}
