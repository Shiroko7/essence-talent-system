.PHONY: dev

# Regenerate ability data from markdown, then start the dev server.
dev:
	bun run generate:all && bun run dev
