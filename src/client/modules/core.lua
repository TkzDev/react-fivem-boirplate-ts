---@description Abrir/Fechar a UI do Totem.
---@param isOpen boolean
---@return void
function ToggleUI(payload)
    SetNuiFocus(payload.visible, payload.visible)
    SendNUIMessage({
        action = "totem:open",
        data = payload.path
    })
end

---@description Callback para receber dados da UI do Totem.
---@param data table
RegisterNUICallback("fetch", function(data, cb)
  print(" Received data to ", json.encode(data))

  cb(true)
end)

---@description Fechar a UI do Totem.
---@param cb function
---@return void
onNuiCallback("hideFrame", function(_, cb)
    ToggleUI({ visible = false })
    cb(true)
end)

---@description Abrir a UI do Totem.
---@return void
onCommand("totem", function(_, args)
    ToggleUI({ visible = true, path = "/home" })
end)