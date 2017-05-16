# get Makefile directory name: http://stackoverflow.com/a/5982798/376773
THIS_MAKEFILE_PATH:=$(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))
THIS_DIR:=$(shell cd $(dir $(THIS_MAKEFILE_PATH));pwd)

ROOT := lib/ index.js
include $(shell node -e "require('n8-make')")

# BIN directory
BIN := $(THIS_DIR)/node_modules/.bin

# Testing WEB APP port
TESTAPP_DIR := webapp/tests
TESTAPP_PORT := 3001

# Files
JS_FILES := $(wildcard index.js lib/*.js test/*.js)
JS_TESTING_FILES := $(wildcard test/test*.js test-whitelist/test*.js)

# applications
NODE ?= node
NPM ?= $(NODE) $(shell which npm)
MOCHA ?= $(NODE) $(BIN)/mocha
WEBPACK ?= $(NODE) $(BIN)/webpack

standalone: compile dist/wpcom.js

compile:
	make build --jobs=8

dist/wpcom.js:
	@$(WEBPACK) -p --config ./webpack.config.js

install: node_modules

node_modules:
	@NODE_ENV= $(NPM) install
	@touch node_modules

lint: node_modules/eslint node_modules/babel-eslint
	@$(BIN)/eslint $(JS_FILES)

eslint: lint

test:
	@$(MOCHA) \
		--timeout 120s \
		--slow 3s \
		--grep "$(FILTER)" \
		--bail \
		--reporter spec \
		--compilers js:babel-register \
		test/

test-watch:
	@$(MOCHA) \
		--timeout 120s \
		--slow 3s \
		--bail \
		--reporter spec \
		--compilers js:babel-register \
		--watch \
		--grep "$(FILTER)" \
		test/

webapp:
	@$(WEBPACK) -p --config webapp/webpack.config.js

media-editor:
	@$(WEBPACK) -p --config examples/media-editor/webpack.config.js

deploy: webapp media-editor
	mkdir -p tmp/
	rm -rf tmp/*
	mkdir -p tmp/tests
	mkdir -p tmp/media-editor
	cp webapp/index.html tmp/
	cp webapp/style.css tmp/
	cp webapp/webapp-bundle.js tmp/
	cp examples/media-editor/index.html tmp/media-editor
	cp examples/media-editor/app.css tmp/media-editor
	cp -rf examples/media-editor/built/ tmp/media-editor/built
	git checkout gh-pages
	cp -rf tmp/* .

.PHONY: standalone test test-all node_modules lint eslint webapp compile
