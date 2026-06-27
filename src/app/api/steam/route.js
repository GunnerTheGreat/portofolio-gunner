import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const STEAM_API_KEY = process.env.STEAM_API_KEY;
  const STEAM_ID = process.env.STEAM_ID;

  if (!STEAM_API_KEY || !STEAM_ID) {
    return NextResponse.json({ 
      error: 'Steam API Key or Steam ID is missing. Add them to .env.local' 
    }, { status: 400 });
  }

  try {
    const [summaryRes, recentRes, backgroundRes, frameRes, ownedGamesRes] = await Promise.all([
      fetch(
        `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${STEAM_ID}`,
        { cache: 'no-store' }
      ),
      fetch(
        `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json`,
        { cache: 'no-store' }
      ),
      fetch(
        `http://api.steampowered.com/IPlayerService/GetMiniProfileBackground/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}`,
        { cache: 'no-store' }
      ),
      fetch(
        `http://api.steampowered.com/IPlayerService/GetAvatarFrame/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}`,
        { cache: 'no-store' }
      ),
      fetch(
        `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&include_appinfo=1&include_played_free_games=1&format=json`,
        { cache: 'no-store' }
      )
    ]);
    
    const summaryData = await summaryRes.json();
    const player = summaryData?.response?.players?.[0];

    if (!player) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    const recentData = await recentRes.json();
    let recentGames = recentData?.response?.games || [];

    const hiddenAppIds = [480];
    recentGames = recentGames.filter(game => !hiddenAppIds.includes(game.appid));

    const backgroundData = backgroundRes.ok ? await backgroundRes.json() : null;
    const frameData = frameRes.ok ? await frameRes.json() : null;

    const assetsBaseUrl = 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/';
    const profileBackground = backgroundData?.response?.profile_background;
    let miniprofileBackgroundUrl = null;
    let miniprofileVideoUrl = null;
    if (profileBackground) {
      if (profileBackground.image_large) miniprofileBackgroundUrl = assetsBaseUrl + profileBackground.image_large;
      if (profileBackground.movie_mp4) miniprofileVideoUrl = assetsBaseUrl + profileBackground.movie_mp4;
    }

    const avatarFrame = frameData?.response?.avatar_frame;
    let avatarFrameUrl = null;
    if (avatarFrame && avatarFrame.image_large) {
      avatarFrameUrl = assetsBaseUrl + avatarFrame.image_large;
    }

    let statusText = 'Offline';
    let statusColor = 'gray';

    if (player.personastate > 0) {
      statusText = 'Online';
      statusColor = 'blue';
    }
    
    if (player.gameextrainfo) {
      statusText = 'In-Game';
      statusColor = 'green';
    }

    const ownedGamesData = await ownedGamesRes.json();
    const allOwnedGames = ownedGamesData?.response?.games || [];

    const topGames = [...allOwnedGames]
      .sort((a, b) => (b.playtime_forever || 0) - (a.playtime_forever || 0))
      .slice(0, 3);

    const favoriteAppIds = [1238840, 2807960, 1238810, 2507950];
    const favoriteGames = favoriteAppIds.map(appId => {
      let found = allOwnedGames.find(g => g.appid === appId);
      if (!found) found = recentData?.response?.games?.find(g => g.appid === appId);
      if (found) return found;
      
      const fallbacks = {
        1238840: { name: 'Battlefield™ 1', img_icon_url: 'a8b13d2f9b87b7a2d61dcb89f5bc3a67dcd2a259' },
        2807960: { name: 'Battlefield™ 6', img_icon_url: 'a758cc85720fc89b5c97995bd8eafb38b3604e47' },
        1238810: { name: 'Battlefield™ V', img_icon_url: 'e3bb73b7e7a8e52e55dc817293a52147320b3b4f' },
        2507950: { name: 'Delta Force', img_icon_url: '0681343bd328c1ad2905d5e236b2cb9e86ba6d79' }
      };
      return { appid: appId, name: fallbacks[appId]?.name || `App ${appId}`, playtime_forever: 0, img_icon_url: fallbacks[appId]?.img_icon_url || '' };
    });

    return NextResponse.json({
      profile: {
        name: player.personaname,
        avatarUrl: player.avatarfull,
        statusText,
        statusColor,
        currentGame: player.gameextrainfo || null,
        profileUrl: player.profileurl,
        miniprofileBackgroundUrl,
        miniprofileVideoUrl,
        avatarFrameUrl
      },
      recentGames: recentGames.slice(0, 3),
      topGames,
      favoriteGames
    });

  } catch (error) {
    console.error('Error fetching Steam data:', error);
    return NextResponse.json({ error: 'Failed to fetch Steam data' }, { status: 500 });
  }
}
