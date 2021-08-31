const path = require("path")
const slash = require("slash")

//creates new page based off of slug in query
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(
    `
      {
        allContentfulTeam {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
  )
    .then(result => {
      if (result.errors) {
        console.log("Error with contentful data", result.errors)
      }

      //creates path for templates
      const teamTemplate = path.resolve("./src/templates/team.js")
      //for each team in the query create page with these parameters
      result.data.allContentfulTeam.edges.forEach(team => {
        createPage({
          path: `/teams/${team.node.slug}/`,
          component: slash(teamTemplate),
          context: {
            slug: team.node.slug,
          },
        })
      })
    })
    .catch(error => console.log("Error with contentful data", error))
}
