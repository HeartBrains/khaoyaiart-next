/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.BKKK_BASE_URL || 'https://next.bkkapp.com/bkkk',
  generateRobotsTxt: true,
  outDir: 'out',
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.KYAF_BASE_URL || 'https://next.bkkapp.com/kyaf'}/sitemap.xml`,
    ],
  },
};
