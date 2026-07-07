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
  ],
};
