import { PlaylistModel } from "../models";
import { Playlist } from "../types";
import { RESTDataSource } from "@apollo/datasource-rest";

export class SpotifyAPI extends RESTDataSource {
  baseURL = "https://spotify-demo-api-fe224840a08c.herokuapp.com/v1/";
  async getFeaturedPlaylists(): Promise<PlaylistModel[]> {
    const response = await this.get<{ playlists: { items: PlaylistModel[] } }>(
      "browse/featured-playlists"
    );

    return response.playlists.items;
  }
  getPlaylist(playlistId: string): Promise<PlaylistModel> {
    return this.get(`playlists/${playlistId}`);
  }

  addItemsToPlaylist(input: { playlistId: string; uris: string[] }) {
    const { playlistId, uris } = input;
    return this.post(`playlists/${playlistId}/tracks`, {
      params: {
        uris: uris.join(","),
      },
    });
  }
}
