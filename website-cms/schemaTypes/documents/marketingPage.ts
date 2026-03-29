import {defineField, defineType} from 'sanity'

export const marketingPage = defineType({
  name: 'marketingPage',
  title: 'Simple marketing page',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'subtitle', type: 'text', rows: 3}),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [{type: 'block'}],
    }),
  ],
})
