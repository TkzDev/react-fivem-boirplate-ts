# NUI Toggle Example / Exemplo de Alternância NUI

## 🇺🇸 EN-US

This code demonstrates how to toggle a NUI (Native UI) interface in FiveM, including blur effects and focus handling.

### Example Code:
```lua
  local ToggleUI = function(isOpen)
    TransitionToBlurred(1050)
    SetNuiFocus(isOpen, isOpen)

    if not isOpen then
      TransitionFromBlurred(1050)
      -- close the screen interface through a message
      SendNUIMessage({ action = 'setVisible', data = false })
      return
    end

    -- display interface on screen
    SendNUIMessage({ action = 'setVisible', data = true })
  end

  -- close the screen interface through frontend communication
  RegisterNUICallback('hideFrame', function(_, cb)
    ToggleUI(false)
    cb(true)
  end)
```

## 🇧🇷 PT-BR

Este código demonstra como alternar uma interface NUI (Interface Nativa) no FiveM, incluindo efeitos de desfoque e gerenciamento de foco.

### Exemplo de Código:

```lua
local ToggleUI = function(isOpen)
  TransitionToBlurred(1050)
  SetNuiFocus(isOpen, isOpen)

  if not isOpen then
    TransitionFromBlurred(1050)
    -- fechar a interface da tela atraves de um envio
    SendNUIMessage({ action = 'setVisible', data = false })
    return
  end

  -- exibir interface na tela
  SendNUIMessage({ action = 'setVisible', data = true })
end

-- fechar a interface da tela atraves de uma comunicação do front
RegisterNUICallback('hideFrame', function(_, cb)
  ToggleUI(false)
  cb(true)
end)```
