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
      name: 'backgroundVideoUrl',
      title: 'Background Video URL (MP4)',
      type: 'url',
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
  ],
};
