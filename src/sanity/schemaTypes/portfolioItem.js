export default {
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Graphics', value: 'graphics' },
          { title: 'Video', value: 'video' },
          { title: 'Music', value: 'music' },
          { title: 'App', value: 'app' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'mainImage',
      title: 'Main Image / Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
    },
    {
      name: 'audioType',
      title: 'Audio Type',
      type: 'string',
      options: {
        list: [
          { title: 'File Upload', value: 'file' },
          { title: 'External URL (Spotify, Soundcloud, etc)', value: 'external' },
        ],
      },
    },
    {
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      hidden: ({ parent }) => parent?.audioType !== 'file',
    },
    {
      name: 'externalAudioUrl',
      title: 'External Audio URL',
      type: 'url',
      hidden: ({ parent }) => parent?.audioType !== 'external',
    },
    {
      name: 'appLink',
      title: 'App / Live Link',
      type: 'url',
    },
    {
      name: 'githubLink',
      title: 'GitHub Link',
      type: 'url',
    },
  ],
};
