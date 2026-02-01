# Commit guidelines

To keep the repository history readable for the whole team, every commit should:

- follow the [Conventional Commit](https://www.conventionalcommits.org) format (`feat:`, `fix:`, `chore:`, etc.),
- keep the subject concise and **in English** (the commitlint configuration enforces ASCII-only subjects),
- add a scope when it helps clarify the change (`feat(timer): add progress bar`), and
- use the imperative mood for the body when needed.

The workflow `.github/workflows/commitlint.yml` runs `commitlint` on every push and pull request and will fail if the message does not match the rules defined in `commitlint.config.js`. The custom rule `subject-ascii-only` keeps every subject inside the ASCII range so it is easier to read and review.

If the workflow fails, update the offending commits (e.g., via `git commit --amend` or `git rebase`) and force-push the branch.
