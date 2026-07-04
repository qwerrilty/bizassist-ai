export const CANVA_TEMPLATES = {
  facebook_post: {
    'Announcement':             'https://www.canva.com/facebook-posts/templates/announcement/',
    'Promotion / Sale':         'https://www.canva.com/facebook-posts/templates/sale/',
    'New Product or Service':   'https://www.canva.com/facebook-posts/templates/product-launch/',
    'Opening Hours Update':     'https://www.canva.com/facebook-posts/templates/business-hours/',
    'Testimonial / Review':     'https://www.canva.com/facebook-posts/templates/testimonial/',
    'Tip or Advice':            'https://www.canva.com/facebook-posts/templates/tips/',
    'Event':                    'https://www.canva.com/facebook-posts/templates/event/',
    'General Update':           'https://www.canva.com/facebook-posts/templates/',
  },
  instagram_post: {
    'Announcement':             'https://www.canva.com/instagram-posts/templates/announcement/',
    'Promotion / Sale':         'https://www.canva.com/instagram-posts/templates/sale/',
    'New Product or Service':   'https://www.canva.com/instagram-posts/templates/product-launch/',
    'Opening Hours Update':     'https://www.canva.com/instagram-posts/templates/',
    'Testimonial / Review':     'https://www.canva.com/instagram-posts/templates/testimonial/',
    'Tip or Advice':            'https://www.canva.com/instagram-posts/templates/tips/',
    'Event':                    'https://www.canva.com/instagram-posts/templates/event/',
    'General Update':           'https://www.canva.com/instagram-posts/templates/',
  },
  linkedin_post: {
    'default': 'https://www.canva.com/linkedin-post/templates/',
  },
  twitter_post: {
    'default': 'https://www.canva.com/twitter-post/templates/',
  },
}

export function getCanvaUrl(platform, postType) {
  const platformTemplates = CANVA_TEMPLATES[platform] || CANVA_TEMPLATES.facebook_post
  return (
    platformTemplates[postType] ||
    platformTemplates['General Update'] ||
    platformTemplates['default'] ||
    'https://www.canva.com/create/social-media/'
  )
}