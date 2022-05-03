ARG docker_registry
FROM ${docker_registry}node:12-slim
 

ENV HOME=/usr/demo-app
WORKDIR $HOME

COPY ["package.json", "$HOME/"]

# Using yarn's offline cache avoids any need to fetch modules remotely.
# In the case of this docker image it reduces build time from 34 seconds to 30 seconds.
# Whether or not those benefits warrant it is up to you.
# The “Offline Mirror” can be shared between build servers or development machines in
# any way that is convenient: a Dropbox folder, stored in source control or on a network
# drive. At Facebook the offline mirror lives inside of our big Mercurial “monorepo”.
RUN apt-get --fix-missing update;apt-get install -y ssh expect dos2unix openssl jq curl vim
# run app as non-root user. `node` is available in node docker images
USER root

# install modules
#   offline: trigger an error if any required dependencies are not available in local cache
#   frozen-lockfile: don't generate a lockfile and fail if an update is needed
#   link-duplicates: create hardlinks to the repeated modules in node_modules
RUN yarn  

COPY ["src", "$HOME/src"]
#COPY ["assets", "$HOME/assets"]
COPY ["tsconfig.json", "$HOME/"]

RUN yarn run tsc
RUN yarn run build
#COPY ["src/sh", "$HOME/dist/sh/"]
#COPY ["assets", "$HOME/dist/assets"]

# expose port 3001
EXPOSE 3001

CMD ["node", "./dist/app.js"]
