# Contributing

Issues and focused pull requests are welcome in the public repository.

Open an issue before starting a broad API or compatibility change so the design can be agreed first. Maintainers review pull requests for focused scope, runtime portability, narrowing behavior, tests, and documentation.

Run the local checks before opening a pull request:

```sh
bun install
bun run check
```

Keep API changes small and include readable example tests. Add a property test when the change introduces an algebraic law, parser, round trip, or invariant over arbitrary input.
