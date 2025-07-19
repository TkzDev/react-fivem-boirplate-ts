SQL = exports.oxmysql

---@description Realizar uma query ao banco de dados.
---@param tbl string
---@param params table
---@return table
query = function(tbl, params)
    if params then
        tbl = tbl:format(table.unpack(params))
    end

    return SQL:query_async(tbl) or {}
end

---@description Executar um comando ao banco de dados.
---@param tbl string
---@param params table
---@return void
execute = function(tbl, params)
    if params then
        tbl = tbl:format(table.unpack(params))
    end

    return SQL:execute(tbl)
end

---@description Pegar objeto com informações do personagem pela SOURCE.
---@param src number
---@return table
getCharaterBySrc = function(src)
    local characterId = API.Passport(src)
    if not characterId then
        return
    end

    local identity = API.Identity(characterId)

    local group = API.getCharacterGroupByType(characterId, "job")
    local fines = API.getCharacterFine(characterId)

    return {
        src = src,
        characterId = characterId,
        age = identity.Age or 31,
        avatar = getCharacterAvatar(characterId),
        carryingWeapon = hasRole(characterId, "carryGun"),
        identity = identity.Name .. " " .. identity.Lastname,
        phone = identity.Phone,
        gender = identity.Sex,
        group = group,
        prison = identity.Prison,
        fines = fines,
    }
end

---@description Pegar objeto com informações do personagem pelo ID.
---@param id number
---@return table
getCharaterById = function(id)
    local src = API.Source(id)
    local characterId = API.Passport(src)
    if not characterId then
        return
    end

    local identity = API.Identity(characterId)

    local group = API.getCharacterGroupByType(characterId, "job")
    local fines = API.getCharacterFine(characterId)

    return {
        src = src,
        characterId = characterId,
        age = identity.Age or 31,
        avatar = getCharacterAvatar(characterId),
        carryingWeapon = hasRole(characterId, "carryGun"),
        identity = identity.Name .. " " .. identity.Lastname,
        phone = identity.Phone,
        gender = identity.Sex,
        group = group,
        prison = identity.Prison,
        fines = fines,
    }
end

---@description Pegar status do personagem pela SOURCE.
---@param src number
---@return table
getCharacterStats = function(src)
    local character = getCharaterBySrc(src)

    local characterPed = GetPlayerPed(src)
    local health = GetEntityHealth(characterPed)
    local armour = GetPedArmour(characterPed)
    local oxygen = GetPlayerOxygenLevel(src)
    local hunger = GetPlayerHungerLevel(src)
    local thirst = GetPlayerThirstLevel(src)

    return {
        health = health,
        armour = armour,
        oxygen = oxygen,
        hunger = hunger,
        thirst = thirst,
    }
end

---@description Retornar avatar do personagem pelo ID
---@param characterId number ID do personagem
---@return string Avatar do personagem
getCharacterAvatar = function(characterId)
    local playerAvatar =  GetResourceState("smartphone") == "started" and SQL:query_async("SELECT avatarURL FROM smartphone_instagram WHERE user_id = ?", { characterId }) or {}

    return ( 'https://github.com/TkzDev.png')
end

---@description Retornar dados do veículo pela placa
---@param plate string Placa do veículo
---@return table
getVehicleByPlate = function(plate)
    local vehicle = SQL:query_async("SELECT * FROM vehicles WHERE plate = ?", { plate })

    if not vehicle[1] then
        return
    end

    return vehicle[1]
end

---@description Verificar se um personagem tem uma ou mais permissões pelo seu ID.
---@param characterId number
---@param role string|table
---@return boolean
hasRole = function(characterId, role)
    if not role then
        return true
    end

    if type(role) == "table" then
        for _, group in pairs(role) do
            if API.HasGroup(characterId, group) then
                return true
            end
        end
    else
        return API.HasGroup(characterId, role)
    end

    return false
end

---@description Adicionar um grupo/permissão para um personagem
---@param characterId number
---@param role string|table
---@param level? number
---@return void
addCharacterRole = function(characterId, role, level)
    API._SetPermission(characterId, role, level)
end

---@description Remover um grupo/permissão de um personagem
---@param characterId number
---@param role string|table
---@return void
removeCharacterRole = function(characterId, role)
    API._RemovePermission(characterId, role)
end

---@description Retornar todos os personagens que estão no mesmo grupo/permissão.
---@param role string|table
---@return table<info: table, players: number>
getMembersInRole = function(role)
    if type(role) == "table" then
        for _, group in pairs(role) do
            infos, total = API.GetGroupMembers(group)

            return infos, total
        end
    else
        local infos, total = API.GetGroupMembers(role)
        return infos, total
    end

    return {}, 0
end

---@description Retornar todos os personagens online que possuem determinada permissão.
---@param role string|table
---@return table<players: table, count: number>
getCharactersByRole = function(role)
    if type(role) == "table" then
        for _, group in pairs(role) do
            Service, total = API.NumPermission(group)

            return Service, total
        end
    else
        return API.NumPermission(role)
    end
end

---@description Retornar todos os personagens online
---@return table<CharacterId: number, src: number>
getAllCharacters = function()
    return API.Players()
end

---@description Retornar todas as propriedades de um personagem
---@param characterId number
---@return table
getCharacterPropertys = function(characterId)
    local query = SQL:query_async("SELECT * FROM homes WHERE user_id = ?", { characterId })

    return query or { }
end

---@description Retornar todas as veículos de um personagem
---@param characterId number
---@return table
getCharacterVehicles = function(characterId)
    local query = SQL:query_async("SELECT * FROM vehicles WHERE Passport = ?", { characterId })

    return query or { }
end

---@description Verificar se um personagem está em serviço
---@param src number
---@param permission table | string
---@return boolean
characterInService = function(src, permission)
    local character = getCharaterBySrc(src)

    if type(permission) == "table" then
        for _, service in pairs(permission) do
            if API.HasService(character.characterId, service) then
                return true
            end

            break
        end
    else
        if API.HasService(character.characterId, permission) then
            return true
        end
    end

    return false
end


---@description Entrar/Sair de serviço
---@param src number
---@param characterId number
---@param permission table | string
---@return void
characterService = function(src, characterId, permission)
    if type(permission) == "table" then
        for _, service in pairs(permission) do
            if not characterInService(src, service) then
                API.ServiceEnter(src, characterId, service, false)
            else
                API.ServiceLeave(src, characterId, service, false)
            end
            
            break
        end
    else
        if not characterInService(src, permission) then
            API.ServiceEnter(src, characterId, permission, false)
        else
            API.ServiceLeave(src, characterId, service, false)
        end
    end
end


---@description Adicionar uma multa a um personagem
---@param characterId number
---@param fine number
addCharacterFine = function(characterId, fine, description, policePassport)
    local character = getCharaterById(characterId)
    local characterPolice = getCharaterById(policePassport)
    
    if not character or not characterPolice then
        return
    end


    print(characterId, fine, description, policePassport)
    exports.bank:createFine(character.characterId, description, fine, { police = API.FullName(characterPolice.characterId) .. "( " .. characterPolice.characterId .. " )", PolicePassport = characterPolice.characterId })
end

---@description Remover uma multa de um personagem
---@param characterId number
---@param fine number
removeCharacterFine = function(characterId, fine)
    local character = getCharaterById(characterId)

    if not character then
        return
    end

    exports.bank:clearFines(character.characterId)
end