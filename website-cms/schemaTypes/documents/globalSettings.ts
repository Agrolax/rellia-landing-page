import {defineField, defineType} from 'sanity'

export const globalSettings = defineType({
  name: 'globalSettings',
  title: 'Global settings',
  type: 'document',
  fields: [
    defineField({name: 'footerTagline', type: 'text', rows: 3}),
    defineField({name: 'supportEmail', type: 'string'}),
    defineField({name: 'linkedinUrl', type: 'url'}),
    defineField({name: 'instagramUrl', type: 'url'}),
    defineField({name: 'copyrightLine', type: 'string'}),
  ],
})
