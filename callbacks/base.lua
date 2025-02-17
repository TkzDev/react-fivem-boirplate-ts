function ToggleUI(isOpen)
    SetNuiFocus(isOpen, isOpen)
    SendNUIMessage({ action = 'setVisible', payload = isOpen })
end

AddToastify = function(type, text, duration, position)
    local data = {
        type = "sucess",     -- success || error
        text = "meu texto falando sla oq",
        duration = "sucess", -- duração em milisegundos
        position = {
            yAxis = "top",   -- "top | center | bottom"
            xAxis = "right"  -- "right | left | center"
        },
        theme = "light"      -- "dark" | "light"
    }

    SendNUIMessage({ action = 'addToastify', payload = data })
end

RegisterNuiCallback('hideFrame', function(_, cb)
    if SetNuiFocus(false, false) then
        return cb(true)
    end

    return cb(false)
end)


---@alias ColorType
---| '"pink"'       # A string literal "pink"
---| '"yellow"'     # A string literal "yellow"
---| '"green"'      # A string literal "green"
---| '"cyan"'       # A string literal "cyan"
---| '"lavender"'   # A string literal "lavender"
---| '"magenta"'    # A string literal "magenta"
---| '"gray"'       # A string literal "gray"
---| '"NEXT"'       # A string literal "NEXT"
---| '"META"'       # A string literal "META"
---| { primaryColor: string, secondaryColor: string } # A table with primaryColor and secondaryColor

---@param color ColorType # A variável "color" segue o tipo definido acima
RegisterNuiCallback('getColors', function(_, cb)
    cb(Config.Colors.Theme)
end)

RegisterCommand('openUI', function()
    ToggleUI(true)
end, false)