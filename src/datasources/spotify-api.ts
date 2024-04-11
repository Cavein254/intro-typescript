import { Playlist } from "../types";
import { RESTDataSource } from "@apollo/datasource-rest";

export class Spotify extends RESTDataSource {
  baseURL = "https://spotify-demo-api-fe224840a08c.herokuapp.com/v1/";
  async getFeaturedPlaylists(): Promise<Playlist[]> {
    const response = await this.get<{ playlists: { items: Playlist } }>(
      "browse/featured-playlists"
    );

    return response?.playlists?.items ?? [];
  }
}
