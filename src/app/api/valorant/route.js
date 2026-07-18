import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const VALORANT_API_KEY = process.env.VALORANT_API_KEY;

  if (!VALORANT_API_KEY) {
    return NextResponse.json({ 
      error: 'Valorant API Key is missing. Add VALORANT_API_KEY to .env.local' 
    }, { status: 400 });
  }

  try {
    const headers = {
      'Authorization': VALORANT_API_KEY,
      'Accept': 'application/json'
    };

    const region = 'ap';
    const name = 'GOD OF GUNNERS';
    const tag = 'myzil';

    const mmrRes = await fetch(`https://api.henrikdev.xyz/valorant/v2/mmr/${region}/${name}/${tag}`, { headers, cache: 'no-store' });
    if (!mmrRes.ok && mmrRes.status === 401) {
       return NextResponse.json({ error: 'Invalid Valorant API Key' }, { status: 401 });
    }
    const mmrData = mmrRes.ok ? await mmrRes.json() : null;

    const accountRes = await fetch(`https://api.henrikdev.xyz/valorant/v1/account/${name}/${tag}`, { headers, cache: 'no-store' });
    const accountData = accountRes.ok ? await accountRes.json() : null;

    const matchesRes = await fetch(`https://api.henrikdev.xyz/valorant/v3/matches/${region}/${name}/${tag}?size=5`, { headers, cache: 'no-store' });
    const matchesData = matchesRes.ok ? await matchesRes.json() : { data: [] };

    const matches = matchesData.data || [];
    
    const mapsRes = await fetch(`https://valorant-api.com/v1/maps`, { cache: 'force-cache' });
    const mapsData = mapsRes.ok ? await mapsRes.json() : { data: [] };
    const mapDict = {};
    if (mapsData.data) {
      mapsData.data.forEach(m => {
        mapDict[m.displayName] = m.listViewIcon;
      });
    }

    const agentCounts = {};
    const recentMatches = [];

    matches.forEach((match, index) => {
      const allPlayers = match.players?.all_players || [];
      const userPlayer = allPlayers.find(p => p.name.toLowerCase() === name.toLowerCase() && p.tag.toLowerCase() === tag.toLowerCase());
      
      if (userPlayer) {
        const agent = userPlayer.character;
        const agentIcon = userPlayer.assets?.agent?.small;
        if (agent) {
          if (!agentCounts[agent]) {
            agentCounts[agent] = { count: 0, icon: agentIcon, name: agent };
          }
          agentCounts[agent].count += 1;
        }

        if (recentMatches.length < 3) {
          const stats = userPlayer.stats;
          const myTeam = userPlayer.team; // 'Red' or 'Blue'
          const teamDetails = match.teams?.[myTeam.toLowerCase()];
          const isWin = teamDetails?.has_won || false;
          
          let matchMvp = allPlayers[0];
          let teamMvp = null;
          let teamMaxScore = -1;

          allPlayers.forEach(p => {
            if (p.stats.score > matchMvp.stats.score) {
              matchMvp = p;
            }
            if (p.team === myTeam && p.stats.score > teamMaxScore) {
              teamMaxScore = p.stats.score;
              teamMvp = p;
            }
          });

          const isMatchMvp = matchMvp?.puuid === userPlayer.puuid;
          const isTeamMvp = !isMatchMvp && teamMvp?.puuid === userPlayer.puuid;
          
          recentMatches.push({
            id: match.metadata.matchid,
            map: match.metadata.map,
            mode: match.metadata.mode,
            mapImage: mapDict[match.metadata.map] || null,
            agent: agent,
            agentIcon: agentIcon,
            kills: stats.kills,
            deaths: stats.deaths,
            assists: stats.assists,
            isWin: isWin,
            isMatchMvp,
            isTeamMvp
          });
        }
      }
    });

    let bestAgent = null;
    let maxCount = 0;
    for (const key in agentCounts) {
      if (agentCounts[key].count > maxCount) {
        maxCount = agentCounts[key].count;
        bestAgent = agentCounts[key];
      }
    }

    return NextResponse.json({
      mmr: mmrData?.data || null,
      account: accountData?.data || null,
      recentMatches,
      bestAgent
    });

  } catch (error) {
    console.error('Error fetching Valorant data:', error);
    return NextResponse.json({ error: 'Failed to fetch Valorant data' }, { status: 500 });
  }
}
