import { client } from "../sanity";
import PortfolioContent from "../components/PortfolioContent";

export const revalidate = 0;

const portfolioQuery = `*[_type == "portfolioItem"]{
  _id,
  title,
  category,
  description,
  "imageUrl": mainImage.asset->url,
  "gallery": gallery[].asset->url, 
  videoUrl,
  "type": audioType,
  "audioUrl": select(
    audioType == "file" => audioFile.asset->url,
    externalAudioUrl
  ),
  appLink,
  githubLink
}`;

const friendsQuery = `*[_type == "friend"]{
  _id,
  name,
  discordId,
  description
}`;

export default async function Home() {
  const data = await client.fetch(portfolioQuery);
  const friendsData = await client.fetch(friendsQuery).catch(() => []);

  const graphics = data.filter((item) => item.category === "graphics");
  const videos = data.filter((item) => item.category === "video");
  const music = data.filter((item) => item.category === "music");
  const apps = data.filter((item) => item.category === "app");

  return (
    <PortfolioContent 
      graphics={graphics}
      videos={videos}
      music={music}
      apps={apps}
      friends={friendsData}
    />
  );
}