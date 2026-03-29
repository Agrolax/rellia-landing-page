import {defineField, defineType} from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact page',
  type: 'document',
  fields: [
    defineField({name: 'heroBadge', type: 'string', title: 'Hero badge'}),
    defineField({name: 'pageTitle', type: 'string'}),
    defineField({name: 'intro', type: 'text', rows: 3}),
    defineField({
      name: 'sideImage',
      title: 'Side image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'sideImageSrc',
      title: 'Side image URL (fallback if no image upload)',
      type: 'string',
    }),
    defineField({name: 'sideImageAlt', type: 'string', title: 'Side image alt text'}),
    defineField({name: 'quoteText', type: 'text', rows: 3, title: 'Quote on image'}),
    defineField({name: 'quoteAttributionName', type: 'string', title: 'Quote — name'}),
    defineField({name: 'quoteAttributionRole', type: 'string', title: 'Quote — role'}),
    defineField({name: 'successTitle', type: 'string'}),
    defineField({name: 'successBody', type: 'text', rows: 2}),
    defineField({
      name: 'labels',
      type: 'object',
      fields: [
        {name: 'firstName', type: 'string'},
        {name: 'lastName', type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'phone', type: 'string'},
        {name: 'companyName', type: 'string', title: 'Company name'},
        {name: 'jobTitle', type: 'string', title: 'Job title'},
        {name: 'companySize', type: 'string', title: 'Company size'},
        {name: 'subject', type: 'string'},
        {name: 'message', type: 'string'},
      ],
    }),
    defineField({
      name: 'placeholders',
      type: 'object',
      fields: [
        {name: 'firstName', type: 'string'},
        {name: 'lastName', type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'phone', type: 'string'},
        {name: 'companyName', type: 'string'},
        {name: 'jobTitle', type: 'string'},
        {name: 'message', type: 'string'},
      ],
    }),
    defineField({name: 'subjectPlaceholder', type: 'string'}),
    defineField({name: 'companySizePlaceholder', type: 'string'}),
    defineField({
      name: 'subjectOptions',
      type: 'array',
      of: [
        defineField({
          name: 'option',
          type: 'object',
          fields: [
            {name: 'value', type: 'string'},
            {name: 'label', type: 'string'},
          ],
        }),
      ],
    }),
    defineField({
      name: 'companySizeOptions',
      title: 'Company size options',
      type: 'array',
      of: [
        defineField({
          name: 'option',
          type: 'object',
          fields: [
            {name: 'value', type: 'string'},
            {name: 'label', type: 'string'},
          ],
        }),
      ],
    }),
    defineField({name: 'submitLabel', type: 'string'}),
    defineField({name: 'sendingLabel', type: 'string'}),
  ],
})
