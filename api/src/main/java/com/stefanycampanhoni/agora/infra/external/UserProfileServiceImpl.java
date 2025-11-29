package com.stefanycampanhoni.agora.infra.external;

import com.stefanycampanhoni.agora.domain.interfaces.IUserProfileService;
import org.springframework.web.client.RestClient;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;

public class UserProfileServiceImpl implements IUserProfileService {

    private final static RestClient REST_CLIENT = RestClient.create();

    @Override
    public byte[] getProfilePicture(String userName) {
        try {
            URL url = this.getDefaultProfilePictureURL(userName);
            String response = REST_CLIENT.get()
                    .uri(url.toString())
                    .retrieve()
                    .body(String.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new byte[0];
    }

    private URL getDefaultProfilePictureURL(String userName) throws URISyntaxException, MalformedURLException {
        // DiceBear's recommendation to generate avatar are to use SVG format
        // but for learning purposes, we'll use PNG format c:
        return new URI("https",
                "api.dicebear.com",
                "/9.x/identicon/png",
                "seed=%s".formatted(userName),
                null).toURL();
    }
}
