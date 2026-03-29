import {defineField, defineType} from 'sanity'

const eventCardFields = [
  {name: 'title', type: 'string' as const},
  {name: 'dateTime', type: 'string' as const},
  {name: 'person', type: 'string' as const},
  {name: 'imageSrc', type: 'string' as const},
  {name: 'href', type: 'string' as const},
  {name: 'comingSoon', type: 'boolean' as const},
  {name: 'buttonText', type: 'string' as const},
]

const eventCardType = {
  type: 'object' as const,
  name: 'eventCard',
  fields: eventCardFields,
}

export const programsLandingPage = defineType({
  name: 'programsLandingPage',
  title: 'Programs & events landing',
  type: 'document',
  fields: [
    defineField({name: 'heroTitleLine1', type: 'string'}),
    defineField({name: 'heroTitleMint', type: 'string'}),
    defineField({name: 'heroSubtitle', type: 'text', rows: 3}),
    defineField({name: 'heroPrimaryCtaLabel', type: 'string'}),
    defineField({name: 'heroSecondaryCtaLabel', type: 'string'}),
    defineField({name: 'programsSectionTitle', type: 'string'}),
    defineField({name: 'programsSectionSubtitle', type: 'text', rows: 3}),
    defineField({
      name: 'programs',
      type: 'array',
      of: [
        defineField({
          name: 'program',
          type: 'object',
          fields: [
            {name: 'title', type: 'string'},
            {name: 'description', type: 'text', rows: 3},
            {name: 'imageSrc', type: 'string'},
            {name: 'href', type: 'string'},
            {name: 'buttonText', type: 'string'},
          ],
        }),
      ],
    }),
    defineField({name: 'upcomingEvents', type: 'array', of: [eventCardType]}),
    defineField({name: 'pastEvents', type: 'array', of: [eventCardType]}),
    defineField({name: 'ctaTitle', type: 'string'}),
    defineField({name: 'ctaBody', type: 'text', rows: 2}),
    defineField({name: 'ctaButtonLabel', type: 'string'}),
    defineField({name: 'ctaButtonHref', type: 'string'}),
  ],
})
