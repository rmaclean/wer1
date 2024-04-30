export type ArcMetadata = {
  data: Array<{
    name: string;
    duration_ms: number;
    track_number: number;
    isrc: string;
    artists: Array<{
      name: string;
    }>;
    album: {
      name: string;
      release_date: string;
      cover: string;
      covers: {
        small: string;
        medium: string;
        large: string;
      };
      upc: string;
    };
    label: string;
    external_metadata: {
      deezer: Array<{
        id: string;
        link: string;
        artists: Array<{
          id: number;
        }>;
        album: {
          id: number;
          cover: string;
        };
      }>;
      youtube: Array<{
        id: string;
        link: string;
        artists: Array<{
          id: string;
          link: string;
        }>;
        album?: {
          id: string;
          link: string;
        };
      }>;
      applemusic: Array<{
        id: string;
        link: string;
        preview: string;
        artists: Array<{
          id: string;
        }>;
        album: {
          id: string;
          cover: string;
        };
      }>;
      spotify: Array<{
        id: string;
        link: string;
        preview: any;
        artists: Array<{
          id: string;
          link: string;
        }>;
        album: {
          id: string;
          link: string;
          cover: string;
        };
      }>;
    };
    type: string;
  }>;
};
