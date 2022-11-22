# Software Engineering Toy Project

## Contribution

### Pull Request

1. Create new branch from `main` to add features or fix bugs (e.g., `ckwu-feat-backend-nearby_search`, `jacky-fix-frontend-attraction-not-canceled`)
2. After finish your code, create pull request to `main` (e.g., `feat(backend): nearby search`, `fix(frontend): attraction not canceled`)
3. Only merge if all test cases are passed and at least one member approves it

#### Branch Name Format

```text
<branch owner>-<type>-<optional scope>-<description>
```

### Commit Message Format

This specification is inspired by [Conventional Commits](https://www.conventionalcommits.org/)

Commit message should be structured as

```text
<type>(<optional scope>): <description>
```

#### Type

- `feat`: A new feature
- `fix`: A bug fix
- `perf`: A code change that improves performance
- `refact`: A code change that neither fixes a bug nor adds a feature
- `test` A code change on testing
- `doc`: Documentation changes

#### Scope

- `frontend` (e.g., `frontend.api`, `frontend.map`)
- `backend` (e.g., `beckend.optimize`)
- `devops`

#### Examples:

- `feat(frontend): add attraction information cards`
- `fix(frontend.api): wrong HTTP request type`
- `refact(backend): remove legacy code`
- `test(backend.optimize): add test case for infeasible schedule`


