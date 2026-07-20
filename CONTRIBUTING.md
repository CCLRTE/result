# Contributing

Issues and focused pull requests are welcome in the public repository.

The repository is generated from a canonical workspace. A maintainer ports an accepted public change into that workspace before the next snapshot. The sync job stops when a public commit is not represented in the generated tree, so it cannot silently overwrite a contribution.

Run the local checks before opening a pull request:

```sh
bun install
bun run check
```

Keep API changes small and include readable example tests. Add a property test when the change introduces an algebraic law, parser, round trip, or invariant over arbitrary input.
