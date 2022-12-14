const compareFunc = require('compare-func')
module.exports = {
  writerOpts: {
    transform: (commit, context) => {
      const issues = []

      if (commit.body && commit.body.indexOf('๐ง BREAKING CHANGES ๐ง')) {
        discard = false
      }

      if (!commit.type) {
        let headerPattern =
          /^(?<type>.*\s\w*)(?:\((?<scope>.*)\))?!?:\s(?<subject>(?:(?!#).)*(?:(?!\s).))$/
        commit.type = ('' + commit.header).replace(headerPattern, '$1')
      }

      if (commit.type === 'โจ feat' || commit.type === 'feat') {
        commit.type = 'โจ Features | ๆฐๅ่ฝ'
      } else if (commit.type === '๐ fix' || commit.type === 'fix') {
        commit.type = '๐ Bug Fixes | Bug ไฟฎๅค'
      } else if (commit.type === 'โก perf' || commit.type === 'perf') {
        commit.type = 'โก Performance Improvements | ๆง่ฝไผๅ'
      } else if (commit.type === 'โช revert' || commit.type === 'revert' || commit.revert) {
        commit.type = 'โช Reverts | ๅ้'
      } else if (commit.type === '๐ docs' || commit.type === 'docs') {
        commit.type = '๐ Documentation | ๆๆกฃ'
      } else if (commit.type === '๐ style' || commit.type === 'style') {
        commit.type = '๐ Styles | ้ฃๆ ผ'
      } else if (commit.type === '๐ฆ refactor' || commit.type === 'refactor') {
        commit.type = '๐ฆ Code Refactoring | ไปฃ็ ้ๆ'
      } else if (commit.type === '๐งช test' || commit.type === 'test') {
        commit.type = '๐งช Tests | ๆต่ฏ'
      } else if (commit.type === '๐ง build' || commit.type === 'build') {
        commit.type = '๐งโ Build System | ๆๅปบ'
      } else if (commit.type === '๐ ci' || commit.type === 'ci') {
        commit.type = '๐ Continuous Integration | CI ้็ฝฎ'
      } else if (commit.type === '๐ณ chore' || commit.type === 'chore') {
        commit.type = '๐ณ Chores | ๅถไปๆดๆฐ'
      }

      if (commit.scope === '*') {
        commit.scope = ''
      }
      if (typeof commit.hash === 'string') {
        commit.hash = commit.hash.substring(0, 7)
      }
      console.log(context)

      if (typeof commit.subject === 'string') {
        let url = context.repository
          ? `${context.host}/${context.owner}/${context.repository}`
          : context.repoUrl
        if (url) {
          url = `${url}/issues/`
          // Issue URLs.
          commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
            issues.push(issue)
            return `[#${issue}](${url}${issue})`
          })
        }
        if (context.host) {
          // User URLs.
          commit.subject = commit.subject.replace(
            /\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g,
            (_, username) => {
              if (username.includes('/')) {
                return `@${username}`
              }

              return `[@${username}](${context.host}/${username})`
            }
          )
        }
      }

      // remove references that already appear in the subject
      commit.references = commit.references.filter((reference) => {
        if (issues.indexOf(reference.issue) === -1) {
          return true
        }

        return false
      })
      return commit
    },
    groupBy: 'type',
    commitGroupsSort: 'title',
    commitsSort: ['scope', 'subject'],
    noteGroupsSort: 'title',
    notesSort: compareFunc
  }
}
