import {defineField, defineType} from 'sanity'

export const faqPage = defineType({
  name: 'faqPage',
  title: 'FAQ page',
  type: 'document',
  fields: [
    defineField({name: 'badge', type: 'string'}),
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'subtitle', type: 'text', rows: 2}),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineField({
          name: 'item',
          type: 'object',
          fields: [
            {name: 'id', type: 'string'},
            {name: 'question', type: 'string'},
            {name: 'answer', type: 'text', rows: 6},
          ],
        }),
      ],
    }),
    defineField({name: 'sidebarTitle', type: 'string'}),
    defineField({name: 'sidebarBody', type: 'text', rows: 4}),
    defineField({name: 'sidebarCtaLabel', type: 'string'}),
    defineField({name: 'sidebarCtaPath', type: 'string'}),
    defineField({name: 'bottomTitle', type: 'string'}),
    defineField({name: 'bottomBody', type: 'text', rows: 4}),
    defineField({name: 'bottomCtaLabel', type: 'string'}),
    defineField({name: 'bottomCtaPath', type: 'string'}),
  ],
})
