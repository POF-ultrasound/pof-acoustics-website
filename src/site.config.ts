// Site-wide settings. Edit text here; no layout code needs to change.
export const site = {
  title: 'POF Acoustics',
  tagline: 'Ultrasound & acoustics research in the Physics of Fluids group, University of Twente',
  // DRAFT mission line: to be rewritten by the team.
  mission:'We study how bubbles and sound interact with fluids and tissue — and turn that physics into open tools for imaging and therapy.',
  // Look: palette = '' (ink) | 'petrol' | 'indigo' | 'graphite'  (see theme.css)
  //       background = 'none' | 'wavefronts' | 'planewave' | 'field' | 'trace'
  palette: 'petrol',
  background: 'field',
  email: 'g.p.r.lajoinie@utwente.nl',
  address: [
    'Physics of Fluids group',
    'University of Twente',
    'P.O. Box 217',
    '7500 AE Enschede',
    'The Netherlands',
  ],
  mapUrl: 'https://www.openstreetmap.org/search?query=Meander%20University%20of%20Twente%20Enschede',
  links: {
    pof: 'https://pof.tnw.utwente.nl',
    ut: 'https://www.utwente.nl',
    github: 'https://github.com/POF-ultrasound',
    repo: 'https://github.com/POF-ultrasound/pof-acoustics-website',
  },
  nav: [
    { label: 'Research', href: '/research/' },
    { label: 'Software & Data', href: '/software/' },
    { label: 'Publications', href: '/publications/' },
    { label: 'News', href: '/news/' },
    { label: 'People', href: '/people/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
  ],
};
