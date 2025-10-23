module.exports = {
  github: {
    release: true
  },
  git: {
    commitMessage: "release: v${version}"
  },
  npm: {
    publish: true
  },
  hooks: {
    "after:bump": "echo 更新版本成功"
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'conventionalcommits',
      infile: 'CHANGELOG.md',
      sameFile: true,
      releaseRules: [
        { type: 'feat', release: 'minor' },
        { type: 'fix', release: 'patch' },
        { type: 'docs', release: 'patch' },
        { type: 'style', release: 'patch' },
        { type: 'refactor', release: 'patch' },
        { type: 'perf', release: 'patch' },
        { type: 'test', release: 'patch' },
      ],
    },
  },
};
