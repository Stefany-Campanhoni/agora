package com.stefanycampanhoni.agora.infra.external;

import com.stefanycampanhoni.agora.domain.interfaces.IUserProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;

@Service
public class UserProfileServiceImpl implements IUserProfileService {

    private final static RestClient REST_CLIENT = RestClient.create();

    @Override
    public byte[] getProfilePicture(String userName) {
        userName = normalizeUserName(userName);

        URL url = this.getDefaultProfilePictureURL(userName);
        return REST_CLIENT.get()
                .uri(url.toString())
                .retrieve()
                .body(byte[].class);
    }

    private String normalizeUserName(String userName) {
        if (userName.length() > 50) {
            userName = userName.substring(0, 50);
        }

        return userName.trim()
                .toLowerCase()
                .replace(" ", "_");
    }

    private URL getDefaultProfilePictureURL(String userName) {
        // DiceBear's recommendation to generate avatar are to use SVG format
        // but for learning purposes, we'll use PNG format c:
        try {
            return new URI("https",
                    "api.dicebear.com",
                    "/9.x/identicon/png",
                    "seed=%s".formatted(userName),
                    null).toURL();
        } catch (URISyntaxException | MalformedURLException err) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to generate profile picture URL",
                    err);
        }
    }
}
