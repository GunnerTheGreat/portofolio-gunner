import { NextResponse } from 'next/server';

export async function GET() {
  const STEAM_API_KEY = process.env.STEAM_API_KEY;
  const STEAM_ID = process.env.STEAM_ID;

  if (!STEAM_API_KEY || !STEAM_ID) {
    return NextResponse.json({ 
      error: 'Steam API Key or Steam ID is missing. Add them to .env.local' 
    }, { status: 400 });
  }

  try {
    const summaryRes = await fetch(
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${STEAM_ID}`,
      { next: { revalidate: 60 } }
    );
    const summaryData = await summaryRes.json();
    const player = summaryData?.response?.players?.[0];

    if (!player) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    const recentRes = await fetch(
      `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json`,
      { next: { revalidate: 60 } }
    );
    const recentData = await recentRes.json();
    const recentGames = recentData?.response?.games || [];

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

    return NextResponse.json({
      profile: {
        name: player.personaname,
        avatarUrl: player.avatarfull,
        statusText,
        statusColor,
        currentGame: player.gameextrainfo || null,
        profileUrl: player.profileurl
      },
      recentGames: recentGames.slice(0, 3)
    });

  } catch (error) {
    console.error('Error fetching Steam data:', error);
    return NextResponse.json({ error: 'Failed to fetch Steam data' }, { status: 500 });
  }
}
