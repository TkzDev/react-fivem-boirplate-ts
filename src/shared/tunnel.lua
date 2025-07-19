Tunnel = module("vrp", "lib/Tunnel")
Proxy = module("vrp", "lib/Proxy")
Tools = module("vrp", "lib/Tools")

API = Proxy.getInterface("vRP")
APIC = Tunnel.getInterface("vRP")
Resource = GetCurrentResourceName()

--- @ignore
emit = TriggerEvent
emitNet = TriggerClientEvent or TriggerServerEvent
onNet = RegisterNetEvent
on = AddEventHandler
ThreadNew = CreateThread
onCommand = RegisterCommand
onNuiCallback = RegisterNUICallback