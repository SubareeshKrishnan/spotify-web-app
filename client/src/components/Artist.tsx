import { Image } from "../state/actions";
import { Artist as ArtistType } from "../state/actions";

export interface ArtistDetails {
    genres: string[],
    images: Image[],
    name: string,   
}

export const Artist: React.FC<ArtistType> = (artistData) => {
    
    return <div className="artist-list">
        <div className="artist-image">
            <img width={50} height={50} className="artist-image" src={artistData.image} alt="artist" />
        </div>
        <div className="artist-name">
            <h3>{artistData.name}</h3>
        </div>
        <div className="artist-genre">
            <p>{artistData.genre}</p>
        </div>
    </div>
}