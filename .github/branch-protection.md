# Branch Protection Rules

Configure these in GitHub → Settings → Branches after pushing.

## `main` (protected)

| Rule | Setting |
|---|---|
| Require pull request before merging | ✓ |
| Required approvals | 1 |
| Dismiss stale reviews on new commits | ✓ |
| Require status checks to pass | `build` (build-web.yml) |
| Require branches to be up to date | ✓ |
| Restrict who can push directly | Nobody (admins only via MR) |
| Allow force pushes | ✗ |
| Allow deletions | ✗ |

**Only `develop` branch can open a MR to `main` (release PR).**

---

## `develop` (protected)

| Rule | Setting |
|---|---|
| Require pull request before merging | ✓ |
| Required approvals | 1 |
| Require status checks to pass | `ci` (ci.yml) |
| Require branches to be up to date | ✓ |
| Allow force pushes | ✗ |
| Allow deletions | ✗ |

**Feature branches (`feat/*`, `fix/*`, etc.) merge here via MR.**

---

## Feature Branch Naming

```
feat/<scope>-<short-description>     e.g. feat/mobile-splash-screen
fix/<scope>-<short-description>      e.g. fix/api-jwt-expiry
refactor/<scope>-<description>       e.g. refactor/ui-token-structure
chore/<scope>-<description>          e.g. chore/db-add-indexes
```

---

## Release Flow

```
feat/x  ──┐
feat/y  ──┤─→  develop  ──→  (release MR)  ──→  main  ──→  tag v1.x.x
fix/z   ──┘                                              └──→  deploy
```

1. Feature work on `feat/*` branch
2. MR → `develop` (CI must pass)
3. When ready to release: bump `package.json` version on `develop`
4. MR `develop` → `main` (build check must pass)
5. Merge → `release.yml` auto-tags and creates GitHub Release
6. Tag push triggers `deploy-api.yml` + `deploy-web.yml`
