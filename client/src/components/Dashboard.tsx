import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Artist, ArtistState, Track, TrackState, UserState } from "../state/actions";
import { Artist as ArtistRenderer } from "./Artist";
import { Loading } from "./Loading";
import { Track as TrackRenderer } from "./Track";

type Token = {
    accessToken: string;
    refreshToken: string;
}

export type Func = () => void;

export const Dashboard: React.FC = () => {

    const { getUserDetails, getTopArtists, getTopTracks } = useActions();
    const { loading: userLoading, data: userData, error: userError }: UserState = useTypedSelector((state) => state.userDetails);
    const { loading: trackLoading, data: trackData, error: trackError }: TrackState = useTypedSelector((state) => state.trackDetails);
    const { loading: artistLoading, data: artistData, error: artistError }: ArtistState = useTypedSelector((state) => state.artistDetails);
    const [view, setView] = useState<string>("");

    const navigate = useNavigate();
    
    const getAccessToken = (): Token => {
        const [accessToken, refreshToken] = window.location.hash
        .substring(1)
        .split("&");
        
        return {
            accessToken,
            refreshToken
        }
    }

    const getDetails = (accessToken: string) => {
        getUserDetails(accessToken);
    }
    
    useEffect(() => {
        
        const accessToken = getAccessToken().accessToken.split("=")[1];
        if (!accessToken) {
            return navigate("/");
        }
        if (!userData.isLoggedIn) {
            getDetails(accessToken);
        }
        window.location.hash = "";

    }, []);

    const handleTopArtist: Func = async () => {
        if (view === "artist") {
            return;
        }
        if (view !== "artist" && artistData[0].name !== "") {
            setView("artist");
            return;
        }
        setView("artist");
        const accessToken = userData.accessToken;
        getTopArtists(accessToken);
    }

    const handleTopTracks: Func = async () => {
        if (view === "track") {
            return;
        }
        if (view !== "track" && trackData[0].trackName !== "") {
            setView("track");
            return;
        }
        setView("track");
        const accessToken = userData.accessToken;
        getTopTracks(accessToken);
    }

    const renderTracks: () => JSX.Element[] | JSX.Element = () => {
        if (trackData.length > 0) {
            const details: Track[] = [...trackData];
            return details.map((details: Track, index: number) => {
                return <TrackRenderer key={index} {...details} />
            });
        } else {
            return <div>No tracks to show.</div>
        }
    }

    const renderArtists: () => JSX.Element[] | JSX.Element  = () => {
        if (artistData.length > 0) {
            const details: Artist[] = [...artistData];
            return details.map((detail: Artist, index: number) => {
                return <ArtistRenderer key={index} {...detail}/>
            })
        } else {
            return <div>No Artists to show.</div>
        }
    }

    return (
        <>
        <div className="container">
                <div className="details-container">
                    {
                        userLoading && <Loading />
                    }
                    {
                        userError && <div>{userError.message}</div>
                    }                   
                    {
                        !userLoading && !userError.message &&
                        <div>
                            <div className="header">
                                <div className="user-details">
                                    <h2 className="title">Logged in as {userData.name}</h2>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Country</td>
                                                <td>{userData.country}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>{userData.email}</td>
                                            </tr>
                                            <tr>
                                                <td>URL</td>
                                                <td><a href={userData.url} target="_blank" rel="noreferrer" className="link">{userData.url}</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                { userData && 
                                    <div className="details">
                                        { 
                                            userData.images && userData.images[0] && userData.images[0].url ?
                                            <img className="profile-image" width={100} height={100} src={userData.images && userData.images[0] && userData.images[0].url} alt="profile" /> :
                                            <img className="profile-image" width={100} height={100} src="https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png" alt="Profile"></img>
                                        }
                                    </div>
                                }
                            </div>
                            <hr />
                            { userData && 
                                <div className="btn-container">
                                    <button className="fetch-btn" onClick={handleTopArtist}>Get top Artist</button>
                                    <button className="fetch-btn" onClick={handleTopTracks}>Get top Tracks</button>
                                </div>
                            }
                        </div>
                    }
                    {
                        view === "artist" && artistLoading && <Loading />
                    }
                    {
                        view === "artist" && artistError && <div>{userError.message}</div>
                    }  
                    {
                        view === "artist" && artistData.length > 0 && !artistError.message && !artistLoading &&
                        <div>
                            <h4>Your top three artists.</h4>
                            <div className="list-container">
                                {
                                    renderArtists()
                                }
                            </div>
                        </div>     
                    } 

                    {
                        view === "track" && trackLoading && <Loading />
                    }
                    {
                        view === "track" && trackError && <div>{userError.message}</div>
                    }  
                    {
                        view === "track" && trackData.length > 0 && !trackError.message && !trackLoading &&
                        <div>
                            <h4>Your top 10 Tracks.</h4>
                            <div className="list-container">
                                {
                                    renderTracks()
                                }
                            </div>
                        </div>
                        
                    }
                </div>
            </div>
        </>
        
    )
}