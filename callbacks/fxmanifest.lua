fx_version("bodacious")
game("gta5")

author("Backend & Frontend: Tkz - discord: tkzdev")
description("Sistema de Boilerplate React/TS para FiveM, usando TailwindCSS")
version("1.0")

lua54("yes")

ui_page("web/dist/index.html") -- PRODUCTION
-- ui_page("http://localhost:5174") -- DEV ONLY

files({
  "web/dist/*",
  "web/dist/**",
  "web/dist/**/*",
})

shared_scripts({
  "shared/*.lua",
})

client_scripts({
  "client/load_components.lua",
  "client/services/*.lua",
})

server_scripts({
  "server/load_components.lua",
  "server/services/*.lua",
})