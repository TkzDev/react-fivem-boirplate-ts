-- # Função para checar se está morto
---@return number
function getHealth()
    return GetEntityHealth(cache.ped)
end

---@return number
function getArmour()
    return GetPedArmour(cache.ped)
end

---@description Desbugar/desgrudar props que estejam grudados no ped.
---@return void
function detachAllObjectsFromPed()
    local objectList = GetGamePool("CObject")
    for _, obj in pairs(objectList) do
        if GetEntityAttachedTo(obj) == cache.ped then
            DetachEntity(obj)
            DeleteEntity(obj)
        end
    end
end

RegisterCommand("debug_ped", detachAllObjectsFromPed)

---@description Iniciar uma progress bar para o jogador.
---@param text string
---@param time number
---@return void
function initProgress(text, time)
    TriggerEvent("createProgressBar", text, time)
end

---@description Criar um texto 3D para o jogador.
---@param x number
---@param y number
---@param z number
---@param t string
---@return void
function draw3dtext(x, y, z, t)
    local _, _x, _y = World3dToScreen2d(x, y, z)
    SetTextFont(4)
    SetTextScale(0.35, 0.35)
    SetTextEntry("STRING")
    SetTextCentre(1)
    AddTextComponentString(t)
    DrawText(_x, _y)
end

---@description Desenhar um marker em coordenadas especificadas com cor e tamanho opcionais.
---@param m number Marker type
---@param x number X coordinate
---@param y number Y coordinate 
---@param z number Z coordinate
---@param c table|nil Optional color table {r,g,b,a}
---@param s number|nil Optional size
---@return void
function drawMrkr(m, x, y, z, c, s)
    local defaultColor = {255, 255, 255, 255}
    local defaultSize = 0.3
    
    local r, g, b, a = table.unpack(c and type(c) == "table" and c or defaultColor)
    local size = s or defaultSize
    
    DrawMarker(m, x, y, z, 0, 0, 0, 0, 0.0, 0.0, size, size, size, r, g, b, a, 0, 0, 0, 1)
end

---@description Carregar um dicionário de animações.
---@param dict string
---@return boolean
function loadAnimDic(dict)
    if not HasAnimDictLoaded(dict) then
        RequestAnimDict(dict)
        local t = 5000
        while not HasAnimDictLoaded(dict) and t > 0 do
            Wait(0)
        end
    end
    return true
end

---@description Carregar um modelo.
---@param modelName string
---@return number
function loadModel(modelName)
    if not HasModelLoaded(GetHashKey(modelName)) then
        RequestModel(modelName)
        local t = 5000
        while not HasModelLoaded(modelName) and t > 0 do
            Wait(0)
        end
    end
    return GetHashKey(modelName)
end

---@description Lista de objetos de tablet.
local tabletObjects = {}

---@description Reproduzir uma animação de tablet.
---@return void
function playTabletAnim()
    RequestAnimDict("amb@world_human_clipboard@male@base")
    while not HasAnimDictLoaded("amb@world_human_clipboard@male@base") do
        Wait(0)
    end
    
    local object = CreateObject(GetHashKey("prop_cs_tablet"), 0, 0, 0, true, true, true)
    AttachEntityToEntity(
        object,
        GetPlayerPed(-1),
        GetPedBoneIndex(GetPlayerPed(-1), 60309),
        0, 0, 0, 0, 0.0, 0.0,
        true, true, false, true, 1, true
    )
    
    TaskPlayAnim(cache.ped, "amb@world_human_clipboard@male@base", "base", 2.0, 2.0, 1.0, 1, 1, 0, 0, 0)
    tabletObjects[#tabletObjects + 1] = object
end
