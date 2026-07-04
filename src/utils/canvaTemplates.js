export const CANVA_TEMPLATES = {
  facebook_post: {
    'Announcement':           'https://www.canva.com/templates/?query=facebook+post+announcement',
    'Promotion / Sale':       'https://www.canva.com/templates/?query=facebook+post+sale+promotion',
    'New Product or Service': 'https://www.canva.com/templates/?query=facebook+post+product+launch',
    'Opening Hours Update':   'https://www.canva.com/templates/?query=facebook+post+business',
    'Testimonial / Review':   'https://www.canva.com/templates/?query=facebook+post+testimonial',
    'Tip or Advice':          'https://www.canva.com/templates/?query=facebook+post+tips',
    'Event':                  'https://www.canva.com/templates/?query=facebook+post+event',
    'General Update':         'https://www.canva.com/templates/?query=facebook+post',
  },
  instagram_post: {
    'Announcement':           'https://www.canva.com/templates/?query=instagram+post+announcement',
    'Promotion / Sale':       'https://www.canva.com/templates/?query=instagram+post+sale',
    'New Product or Service': 'https://www.canva.com/templates/?query=instagram+post+product+launch',
    'Opening Hours Update':   'https://www.canva.com/templates/?query=instagram+post+business',
    'Testimonial / Review':   'https://www.canva.com/templates/?query=instagram+post+testimonial',
    'Tip or Advice':          'https://www.canva.com/templates/?query=instagram+post+tips',
    'Event':                  'https://www.canva.com/templates/?query=instagram+post+event',
    'General Update':         'https://www.canva.com/templates/?query=instagram+post',
  },
  linkedin_post: {
    'default': 'https://www.canva.com/templates/?query=linkedin+post',
  },
  twitter_post: {
    'default': 'https://www.canva.com/templates/?query=twitter+post',
  },
}

export function getCanvaUrl(platform, postType) {
  const platformTemplates = CANVA_TEMPLATES[platform] || CANVA_TEMPLATES.facebook_post
  return (
    platformTemplates[postType] ||
    platformTemplates['General Update'] ||
    platformTemplates['default'] ||
    'https://www.canva.com/templates/?query=social+media+post'
  )
}