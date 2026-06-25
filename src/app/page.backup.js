import { client } from "../sanity";
import PortfolioContent from "../components/PortfolioContent";

export const revalidate = 0;

const query = `*[_type == "portfolioItem"]{
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

export default async function Home() {
  const data = await client.fetch(query);

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
    />
  );
}
