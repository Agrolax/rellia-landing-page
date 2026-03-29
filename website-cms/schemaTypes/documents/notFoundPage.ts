import {defineField, defineType} from 'sanity'

export const notFoundPage = defineType({
  name: 'notFoundPage',
  title: '404 page',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'message', type: 'text', rows: 2}),
    defineField({name: 'ctaLabel', type: 'string'}),
  ],
})
