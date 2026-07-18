import { NextResponse } from 'next/server';

export const revalidate = 900; // Cache for 15 minutes to avoid rate limits

export async function GET() {
  const XBL_API_KEY = process.env.XBL_API_KEY;

  if (!XBL_API_KEY) {
    return NextResponse.json({ 
      error: 'Xbox API Key is missing. Add XBL_API_KEY to .env.local' 
    }, { status: 400 });
  }

  try {
    const headers = {
      'X-Authorization': XBL_API_KEY,
      'Accept': 'application/json',
      'Accept-Language': 'en-US'
    };

    const profileRes = await fetch('https://xbl.io/api/v2/account', { headers, next: { revalidate: 900 } });
    
    if (!profileRes.ok) {
      if (profileRes.status === 401) {
         return NextResponse.json({ error: 'Invalid Xbox API Key' }, { status: 401 });
      }
      return NextResponse.json({ error: 'Failed to fetch Xbox profile' }, { status: profileRes.status });
    }

    const profileData = await profileRes.json();
    const user = profileData.content?.profileUsers?.[0] || profileData.profileUsers?.[0];

    if (!user) {
      return NextResponse.json({ error: 'Xbox User not found' }, { status: 404 });
    }

    const settings = user.settings || [];
    const getSetting = (id) => settings.find(s => s.id === id)?.value;

    const gamertag = getSetting('Gamertag');
    const displayPic = getSetting('GameDisplayPicRaw');
    const gamerscore = getSetting('Gamerscore');
    const xuid = user.id;

    let statusText = 'Offline';
    let statusColor = 'gray';
    let currentGame = null;

    try {
      const presenceRes = await fetch(`https://xbl.io/api/v2/${xuid}/presence`, { headers, next: { revalidate: 300 } });
      if (presenceRes.ok) {
        const presenceData = await presenceRes.json();
        const presence = presenceData.content || presenceData[0] || {};
        
        if (presence.state === 'Online') {
          statusText = 'Online';
          statusColor = 'green';
          
          if (presence.devices && presence.devices.length > 0) {
            const device = presence.devices[0];
            const title = device.titles?.find(t => t.placement === 'Full');
            if (title) {
              currentGame = title.name;
              statusText = 'In-Game';
              statusColor = 'blue';
            }
          }
        }
      }
    } catch (e) {
      console.error('Failed to fetch Xbox presence:', e);
    }

    let recentGames = [];
    try {
      const historyRes = await fetch(`https://xbl.io/api/v2/player/titleHistory`, { headers, next: { revalidate: 900 } });
      if (historyRes.ok) {
        const historyData = await historyRes.json();
        
        const titles = historyData.content?.titles || historyData.titles;
        if (titles && Array.isArray(titles)) {
          recentGames = titles.slice(0, 3).map(title => ({
            name: title.name,
            titleId: title.titleId,
            img_icon_url: title.displayImage || null,
            type: title.type,
            lastUnlock: title.achievement?.currentAchievements > 0 ? true : false,
            earnedAchievements: title.achievement?.currentAchievements || 0,
            totalAchievements: title.achievement?.totalAchievements || 0,
            playtime: 0 // Optional: can be parsed from history if available
          }));
        }
      }
    } catch (e) {
      console.error('Failed to fetch Xbox title history:', e);
    }

    return NextResponse.json({
      profile: {
        name: gamertag,
        avatarUrl: displayPic,
        statusText,
        statusColor,
        currentGame,
        gamerscore,
        xuid,
        profileUrl: `https://xboxgamertag.com/search/${gamertag}`
      },
      recentGames
    });

  } catch (error) {
    console.error('Error fetching Xbox data:', error);
    return NextResponse.json({ error: 'Failed to fetch Xbox data' }, { status: 500 });
  }
}
