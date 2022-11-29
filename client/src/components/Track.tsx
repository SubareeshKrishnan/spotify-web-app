import { Image, Track as TrackType } from "../state/actions";

export interface TrackDetails {
    name: string;
    album: {
        name: string,
        images: Image[],
        artists: {
            name: string
        }[],
    }
}

export const Track: React.FC<TrackType> = (trackData) => {
    return (
    <div className="track-list">
        <div>
            <img width={50} height={50} className="track-image" src={trackData.image} alt="track" />
        </div>
        <div className="track-name">
            <h3>{trackData.trackName}</h3>
        </div>
        <div className="album-name">
            <p>{trackData.artistName}</p>
        </div>
        <div className="album-artist">
            <p>{trackData.artistName}</p>
        </div>
    </div>
    )
}