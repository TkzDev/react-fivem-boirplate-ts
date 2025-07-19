local function ToggleUI(payload)
  SetNuiFocus(payload.visible, payload.visible)
  SendNUIMessage({
    action = "setVisible",
    payload = {
      visible = payload.visible,
      path = payload.path,
    },
  })
end

RegisterNUICallback("fetch", function(data, cb)
  print(" Received data to ", json.encode(data))

  cb(true)
end)

RegisterNUICallback("hideFrame", function(_, cb)
  ToggleUI({ visible = false })
  cb(true)
end)

RegisterCommand("open", function()
  ToggleUI({ visible = true, path = "/home" })
end)
