package group.b.rest.daos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Users {
    private String google_id;
    private String email;
    private String given_name;
    private String family_name;
    private List<String> contents;
    private List<String> jars_owned;
    private List<String> jars_shared;

}
