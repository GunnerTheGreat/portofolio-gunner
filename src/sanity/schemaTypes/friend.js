export default {
  name: 'friend',
  title: 'Friend & Connection',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'discordId',
      title: 'Discord ID',
      type: 'string',
      description: 'The Discord User ID of the friend (must be in the Lanyard Discord server).',
    },
    {
      name: 'description',
      title: 'Hover Description',
      type: 'string',
      description: 'A little description that shows when you hover over them! hahaha',
    },
    {
      name: 'backgroundVideoFile',
      title: 'Background Video File (Upload MP4)',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    },
    {
      name: 'audioFile',
      title: 'Background Audio File',
      type: 'file',
    },
    {
      name: 'audioTitle',
      title: 'Audio Title',
      type: 'string',
    },
    {
      name: 'audioArtist',
      title: 'Audio Artist',
      type: 'string',
    },
    {
      name: 'spotifyUrl',
      title: 'Spotify Track URL',
      type: 'url',
      description: 'Optional: Paste a Spotify track link here to automatically grab the cover art and title!',
    },
    {
      name: 'twitterUrl',
      title: 'Twitter/X URL',
      type: 'url',
    },
    {
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    },
    {
      name: 'websiteUrl',
      title: 'Personal Website URL',
      type: 'url',
    },
    {
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    },
    {
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
    },
    {
      name: 'tiktokUrl',
      title: 'TikTok URL',
      type: 'url',
    },
  ],
};
