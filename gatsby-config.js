module.exports = {
  siteMetadata: {
    title: `Pandas Eating Lots`,
  },
  plugins: [
    // Helmet handles head meta data.
    `gatsby-plugin-react-helmet`,

    // Manifest handles SEO manifest
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "GatsbyJS",
        short_name: "GatsbyJS",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "src/images/icon.png", // This path is relative to the root of the site.
      },
    },
 
    // Google Docs
    {
      resolve: "gatsby-source-google-docs",
      options: {
          // Mandatory
          // --------
          foldersIds: ["1VWoTYvYX59Xfb8vquHqvkSGZUWtEKEQH", "1OncIylGYF9Me_PilojPieM4eNi9qV4_M"], // folders Ids can be found in Google Drive URLs
          config: {
              api_key: "AIzaSyBSKSNLRWLP7VeB1s8FnsB4xqjVWxgFnBc",
              client_id: "515252225825-ddfcpstvgu9ul5flv10qtfetsegv7r3l.apps.googleusercontent.com",
              client_secret: "-Xtq-yLQ1iJ3VoHCgJeRtTfp",
              // Optional
              // --------
               access_type: "offline",
              redirect_uris: [
                  "urn:ietf:wg:oauth:2.0:oob",
                  "http://localhost:9000",
              ],
              scope: [
                  "https://www.googleapis.com/auth/documents.readonly", // GoogleDocs API read access
                  "https://www.googleapis.com/auth/drive.metadata.readonly", // GoogleDrive API read access
              ],
              token_path: "google-docs-token.json", 
          },
          // Optional
          // --------
            fields: ["createdTime"], // https://developers.google.com/drive/api/v3/reference/files#resource
          // fieldsMapper: {createdTime: "date", name: "title"}, // To rename fields 
      },
    },

    // Source Filesystem
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },

    // Typography
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },

    // Markdown
    `gatsby-transformer-remark`,
    `gatsby-plugin-emotion`,
    'gatsby-plugin-offline'
  ],
}
