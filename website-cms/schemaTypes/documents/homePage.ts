import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    defineField({name: 'headlinePrefix', type: 'string'}),
    defineField({name: 'headlineAccent', type: 'string'}),
    defineField({name: 'subheadline', type: 'string'}),
    defineField({name: 'primaryCtaLabel', type: 'string'}),
    defineField({name: 'primaryCtaPath', type: 'string'}),
    defineField({name: 'secondaryCtaLabel', type: 'string'}),
    defineField({name: 'secondaryCtaPath', type: 'string'}),
    defineField({name: 'metricsHeading', type: 'string'}),
    defineField({name: 'metricsSubheading', type: 'text', rows: 3}),
    defineField({
      name: 'metrics',
      type: 'array',
      of: [
        defineField({
          name: 'metric',
          type: 'object',
          fields: [
            {name: 'label', type: 'string'},
            {name: 'value', type: 'number'},
            {name: 'suffix', type: 'string'},
          ],
        }),
      ],
    }),
    defineField({name: 'howItWorksSectionTitle', type: 'string'}),
    defineField({name: 'testimonialsTitleLead', type: 'string'}),
    defineField({name: 'testimonialsTitleAccent', type: 'string'}),
    defineField({
      name: 'whyFeatures',
      type: 'array',
      of: [
        defineField({
          name: 'feature',
          type: 'object',
          fields: [
            {name: 'iconKey', type: 'string', description: 'e.g. target, userRound, bookOpen'},
            {name: 'title', type: 'string'},
            {name: 'description', type: 'text', rows: 3},
          ],
        }),
      ],
    }),
    defineField({name: 'ctaTitle', type: 'string'}),
    defineField({name: 'ctaButtonLabel', type: 'string'}),
    defineField({name: 'ctaButtonPath', type: 'string'}),
    defineField({name: 'ctaImageUrl', type: 'url'}),
    defineField({name: 'ctaImageAlt', type: 'string'}),
    defineField({
      name: 'testimonials',
      type: 'array',
      of: [
        defineField({
          name: 'testimonial',
          type: 'object',
          fields: [
            {name: 'name', type: 'string'},
            {name: 'role', type: 'string'},
            {name: 'company', type: 'string'},
            {name: 'quote', type: 'text', rows: 4},
            {name: 'companyInfo', type: 'text', rows: 3},
            {name: 'image', type: 'image', options: {hotspot: true}},
            {name: 'imageSrc', type: 'string', description: 'Fallback URL if no upload'},
          ],
        }),
      ],
    }),
  ],
})
