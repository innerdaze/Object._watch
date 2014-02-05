NODE ?= node

test:
	@$(NODE) ./node_modules/.bin/mocha \
        --harmony \
        --harmony-generators \
        --recursive \
        --require should \
        --timeout 0 \
        --reporter nyan

.PHONY: test