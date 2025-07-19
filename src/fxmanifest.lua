fx_version("bodacious")
game("gta5")
lua54("yes")

author("Tkz - discord: tkzdev")
description("Sistema de Boilerplate React/TS para FiveM, usando TailwindCSS.")
version("1.0")


ui_page("src/web/dist/index.html") -- PRODUCTION
-- ui_page("http://localhost:5174") -- DEV ONLY

files({
	"src/web/dist/*",
	"src/web/dist/**",
	"src/web/dist/**/*",
})

shared_scripts({
	"config/*",
	"src/shared/**",
})

client_scripts({
	"src/client/**",
})

server_scripts({
	"src/server/**",
})