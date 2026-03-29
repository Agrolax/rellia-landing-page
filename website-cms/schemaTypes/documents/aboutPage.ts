import {defineField, defineType} from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  fields: [
    defineField({name: 'heroLine1', type: 'string'}),
    defineField({name: 'heroLine2Mint', type: 'string'}),
    defineField({name: 'heroLine3', type: 'string'}),
    defineField({name: 'heroIntro', type: 'text', rows: 3}),
    defineField({name: 'missionTitle', type: 'string'}),
    defineField({name: 'missionParagraphs', type: 'array', of: [{type: 'text', rows: 4}]}),
    defineField({name: 'missionImage', type: 'image', options: {hotspot: true}}),
    defineField({name: 'missionImageSrc', type: 'string'}),
    defineField({name: 'missionImageAlt', type: 'string'}),
    defineField({name: 'valuesTitle', type: 'string'}),
    defineField({name: 'valuesSubtitle', type: 'text', rows: 2}),
    defineField({
      name: 'values',
      type: 'array',
      of: [
        defineField({
          name: 'value',
          type: 'object',
          fields: [
            {name: 'iconKey', type: 'string'},
            {name: 'title', type: 'string'},
            {name: 'description', type: 'text', rows: 3},
          ],
        }),
      ],
    }),
    defineField({name: 'teamTitle', type: 'string'}),
    defineField({name: 'teamSubtitle', type: 'text', rows: 2}),
    defineField({
      name: 'team',
      type: 'array',
      of: [
        defineField({
          name: 'member',
          type: 'object',
          fields: [
            {name: 'name', type: 'string'},
            {name: 'role', type: 'string'},
            {name: 'bio', type: 'text', rows: 3},
            {name: 'image', type: 'image', options: {hotspot: true}},
            {name: 'imageSrc', type: 'string'},
          ],
        }),
      ],
    }),
    defineField({name: 'ctaTitle', type: 'string'}),
    defineField({name: 'ctaBody', type: 'text', rows: 3}),
    defineField({name: 'ctaFounderLabel', type: 'string'}),
    defineField({name: 'ctaTeamLabel', type: 'string'}),
  ],
})
