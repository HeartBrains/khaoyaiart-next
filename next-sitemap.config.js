/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.BKKK_BASE_URL || 'https://khaoyaiart.bkkkapp.com',
  generateRobotsTxt: true,
  outDir: 'out',
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.KYAF_BASE_URL || 'https://khaoyaiartforest.com'}/sitemap.xml`,
    ],
  },
};
